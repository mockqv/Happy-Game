//@ts-nocheck
"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiSend, FiCpu, FiTrash2 } from "react-icons/fi";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AssistenteIAPageProps {}

type Message = {
  text: string;
  sender: "user" | "ai";
};

const initialMessage: Message = {
  text: "Olá! Sou seu assistente de análise de dados. Pergunte-me sobre as métricas do site.",
  sender: "ai",
};

export function AssistenteIAPage({}: AssistenteIAPageProps) {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages && JSON.parse(savedMessages).length > 0) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { text: input, sender: "user" };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    try {
      // A única lógica aqui é chamar a sua API Genkit.
      const res = await fetch("/api/assistente", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            history: newMessages.slice(0, -1), // Envia o histórico sem a nova pergunta
            newQuestion: currentInput 
        }),
      });

      if (!res.ok) {
          throw new Error(`API Error: ${res.statusText}`);
      }

      const data = await res.json();
      const aiMessage: Message = { text: data.response, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error("Erro ao obter resposta da IA:", error);
      const errorMessage: Message = {
        text: "Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente.",
        sender: "ai",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetConversation = () => {
    setMessages([initialMessage]);
    localStorage.removeItem("chatHistory");
    setShowConfirmModal(false);
  };

  return (
    <Card className="h-[calc(100vh-18rem)] flex flex-col relative">
      {showConfirmModal && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
          <div className="bg-background p-6 rounded-lg shadow-xl space-y-4">
            <p className="font-semibold">Tem certeza?</p>
            <p className="text-sm text-muted-foreground">
              Todo o histórico da conversa será perdido.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowConfirmModal(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleResetConversation}>
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}

      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FiCpu />
          Assistente de Análise (Genkit)
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={() => setShowConfirmModal(true)}>
          <FiTrash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-1 pr-4" viewportRef={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <FiCpu className="text-2xl mb-2 text-primary" />
                )}
                <div
                  className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end gap-2 justify-start">
                <FiCpu className="text-2xl mb-2 text-primary" />
                <div className="max-w-xs lg:max-w-md p-3 rounded-lg bg-muted">
                  <p className="text-sm animate-pulse">Analisando dados...</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <form
          onSubmit={handleSendMessage}
          className="flex items-center gap-2 pt-4 border-t"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Qual jogador foi mais procurado?"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <FiSend />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}