import ChatPage from "@/components/chat/ChatPage";

export default function MessagesPage() {
  return (
    <div className="h-[calc(100vh-70px)] bg-light-gray">
      {/* Height is viewport minus navbar (70px) */}
      <ChatPage />
    </div>
  );
}
