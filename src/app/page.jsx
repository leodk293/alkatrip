"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import googleLogo from "../../public/google-logo.png";
import { signIn, useSession } from "next-auth/react";

const Home = () => {
  const { status, data: session } = useSession();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history when user is authenticated
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      loadChatHistory();
    }
  }, [status, session]);

  async function loadChatHistory() {
    try {
      const response = await fetch(`/api/chat?userId=${session.user.id}`);
      if (response.ok) {
        const data = await response.json();
        const formattedMessages = data.chats.flatMap((chat) => [
          {
            type: "user",
            content: String(chat.userRequest || ""),
            timestamp: chat.createdAt || new Date().toISOString(),
          },
          {
            type: "ai",
            content: String(chat.aiResponse || ""),
            timestamp: chat.createdAt || new Date().toISOString(),
          },
        ]);
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  }

  async function handleSignin() {
    try {
      await signIn("google");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  }

  async function fetchResponseFromAI(userMessage) {
    try {
      const response = await fetch("/api/ai-process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from AI");
      }

      const data = await response.json();

      // The API now returns clean content directly in data.message
      const aiMessage =
        data.message || "Sorry, I couldn't generate a response.";

      await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userRequest: userMessage,
          aiResponse: aiMessage,
          userId: session?.user?.id,
          userName: session?.user?.name,
        }),
      });

      return aiMessage;
    } catch (error) {
      console.error("Error fetching response from AI:", error);
      return "Sorry, I'm having trouble processing your request right now. Please try again.";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message to chat
    const newUserMessage = {
      type: "user",
      content: userMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    // Get AI response
    const aiResponse = await fetchResponseFromAI(userMessage);

    // Add AI response to chat
    const newAiMessage = {
      type: "ai",
      content: aiResponse,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newAiMessage]);
    setIsLoading(false);
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-4">
      <div className="w-full max-w-4xl h-[600px] bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-lg">Alkatrip AI Assistant</h1>
              <p className="text-xs opacity-80">Your personal travel guide</p>
            </div>
            {status === "authenticated" && session?.user && (
              <div className="ml-auto flex items-center gap-2">
                <span className="text-sm opacity-90">
                  Welcome, {session.user.name?.split(" ")[0]}!
                </span>
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-white/30"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            // Welcome Message
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                AI
              </div>
              <div className="bg-white/10 text-white p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <p>
                  Hello! I'm your Alkatrip AI assistant. Where would you like to
                  go today?
                </p>
                <p className="text-xs opacity-70 mt-1">Just now</p>
              </div>
            </div>
          ) : (
            // Chat Messages
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "items-start gap-3"
                }`}
              >
                {message.type === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                    AI
                  </div>
                )}
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${
                    message.type === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-white/10 text-white rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={`text-xs opacity-70 mt-1 ${
                      message.type === "user" ? "text-right" : ""
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                AI
              </div>
              <div className="bg-white/10 text-white p-3 rounded-lg rounded-tl-none">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                  <span className="text-sm opacity-70">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Auth Prompt or Input Area */}
        {status === "unauthenticated" ? (
          <div className="p-4 bg-white/5 border-t border-white/10 flex flex-col items-center">
            <p className="text-white/80 mb-4 text-center">
              Sign in to start chatting with our travel assistant
            </p>
            <button
              onClick={handleSignin}
              className="flex cursor-pointer items-center w-full max-w-md justify-center gap-3 rounded-md bg-white px-4 py-3 text-gray-700 shadow-md hover:shadow-lg transition-all border border-gray-300"
            >
              <Image
                src={googleLogo}
                alt="Google"
                width={20}
                height={20}
                className="object-contain"
              />
              <span className="font-medium">Sign in with Google</span>
            </button>
          </div>
        ) : status === "authenticated" ? (
          <form
            onSubmit={handleSubmit}
            className="p-4 bg-white/5 border-t border-white/10"
          >
            <div className="flex items-center gap-2">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Ask about destinations, hotels, or activities..."
                className="flex-1 bg-white/10 border border-white/20 rounded-full py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 cursor-pointer hover:bg-indigo-700 disabled:bg-indigo-800 disabled:opacity-50 text-white rounded-full p-3 transition-colors"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="flex justify-center items-center py-6">
            <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-white/70 text-sm">Loading...</span>
          </div>
        )}
      </div>

      <p className="text-white/100 text-xs mt-6 text-center">
        Alkatrip AI Assistant © {new Date().getFullYear()}
      </p>
    </div>
  );
};

export default Home;
