import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Paperclip, Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/store/AuthContext';

// Using senderId 1 as the "current user" marker in mock data
const CURRENT_USER_SENDER_ID = 1;

interface Message {
  id: number;
  senderId: number;
  text: string;
  time: string;
  isSystem?: boolean;
}


interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
}
const Messages: React.FC = () => {
  const { user } = useAuth();
  const currentUserId = user?.id || 'me';
  const [selectedConv, setSelectedConv] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1, name: 'Jean Martin', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face',
      lastMessage: 'N\'oubliez pas notre session demain !', time: '14:30', unread: 2, online: true,
      messages: [
        { id: 1, senderId: 2, text: 'Bonjour Marie ! Comment avancez-vous sur le projet React ?', time: '14:00' },
        { id: 2, senderId: 1, text: 'Bonjour Jean ! J\'ai terminé le composant principal. Je travaille sur les tests.', time: '14:10' },
        { id: 3, senderId: 2, text: 'Excellent ! N\'hésitez pas si vous avez des questions sur les tests unitaires.', time: '14:20' },
        { id: 4, senderId: 2, text: 'N\'oubliez pas notre session demain !', time: '14:30' },
      ],
    },
    {
      id: 2, name: 'Sophie Laurent', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop&crop=face',
      lastMessage: 'Votre CV a été mis à jour avec succès.', time: '10:15', unread: 0, online: false,
      messages: [
        { id: 5, senderId: 3, text: 'Bonjour ! J\'ai revu votre CV et j\'ai quelques suggestions.', time: '09:30' },
        { id: 6, senderId: 1, text: 'Merci Sophie ! Je suis prête à écouter.', time: '09:45' },
        { id: 7, senderId: 3, text: 'Votre CV a été mis à jour avec succès.', time: '10:15' },
      ],
    },
    {
      id: 3, name: 'Pierre Moreau', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face',
      lastMessage: 'La convention est prête pour signature.', time: 'Hier', unread: 1, online: true,
      messages: [
        { id: 8, senderId: 4, text: 'Bonjour, la convention de stage est en cours de préparation.', time: 'Hier 09:00' },
        { id: 9, senderId: 1, text: 'Merci pour l\'information !', time: 'Hier 09:30' },
        { id: 10, senderId: 4, text: 'La convention est prête pour signature.', time: 'Hier 16:00' },
      ],
    },
    {
      id: 4, name: 'Système StageGuide', avatar: '',
      lastMessage: 'Nouvelle offre de stage correspondant à votre profil.', time: 'Hier', unread: 1, online: true,
      messages: [
        { id: 11, senderId: 0, text: 'Bienvenue sur StageGuide ! Complétez votre profil pour recevoir des recommandations.', time: 'Il y a 3 jours', isSystem: true },
        { id: 12, senderId: 0, text: 'Nouvelle offre de stage correspondant à votre profil.', time: 'Hier', isSystem: true },
      ],
    },
  ]);

  const filteredConversations = conversations.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConv = conversations.find(c => c.id === selectedConv);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages.length]);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConv) return;
    setConversations(prev => prev.map(c => {
      if (c.id === selectedConv) {
        const msg: Message = {
          id: Date.now(),
          senderId: CURRENT_USER_SENDER_ID,
          text: newMessage.trim(),
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        };
        return { ...c, messages: [...c.messages, msg], lastMessage: newMessage.trim(), time: 'Maintenant' };
      }
      return c;
    }));
    setNewMessage('');
  };


  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* Conversation List */}
      <div className={`w-full md:w-80 border-r border-gray-100 flex flex-col ${selectedConv !== null ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#0A2463] mb-3">Messages</h2>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConv(conv.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${selectedConv === conv.id ? 'bg-blue-50' : ''}`}
            >
              <div className="relative flex-shrink-0">
                {conv.avatar ? (
                  <img src={conv.avatar} alt={conv.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#3E7BFA] flex items-center justify-center text-white text-sm font-bold">SG</div>
                )}
                {conv.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900 truncate">{conv.name}</p>
                  <span className="text-xs text-gray-400 flex-shrink-0">{conv.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="w-5 h-5 bg-[#3E7BFA] text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">{conv.unread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {selectedConv !== null && activeConv ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="md:hidden text-gray-600 mr-1" onClick={() => setSelectedConv(null)}>
                <ArrowLeft size={20} />
              </button>
              {activeConv.avatar ? (
                <img src={activeConv.avatar} alt={activeConv.name} className="w-9 h-9 rounded-full object-cover" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-[#3E7BFA] flex items-center justify-center text-white text-sm font-bold">SG</div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900">{activeConv.name}</p>
                <p className="text-xs text-green-500">{activeConv.online ? 'En ligne' : 'Hors ligne'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"><Phone size={16} /></button>
              <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"><Video size={16} /></button>
              <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500"><MoreVertical size={16} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeConv.messages.map((msg) => {
              const isMe = msg.senderId === CURRENT_USER_SENDER_ID;

              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.isSystem ? 'bg-gray-100 text-gray-600 mx-auto text-center text-xs' :
                    isMe ? 'bg-[#3E7BFA] text-white rounded-br-md' : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}>
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${isMe ? 'text-blue-200' : 'text-gray-400'}`}>{msg.time}</p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-500">
                <Paperclip size={18} />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Tapez votre message..."
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#3E7BFA] focus:border-transparent outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="w-9 h-9 bg-[#3E7BFA] rounded-xl flex items-center justify-center text-white hover:bg-[#2D6AE0] transition-colors disabled:opacity-50"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 hidden md:flex items-center justify-center text-gray-400">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={24} className="text-gray-300" />
            </div>
            <p className="text-sm">Sélectionnez une conversation</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
