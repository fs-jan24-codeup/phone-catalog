import { useState, useRef, useEffect } from 'react';
import CloseChat from '../../assets/icons/close.svg?react';
import OpenChat from '../../assets/icons/chat.svg?react';
import Assistant from '../../assets/icons/assistant.svg?react';
import OpenAI from 'openai';
import './Chat.scss';

interface ChatMessage {
  text: string;
  user: string;
}

export const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
  });
  const [conversationHistory, setConversationHistory] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const sendMessage = async () => {
    const userMessage: ChatMessage = { text: input, user: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    try {
      const botMessage = await sendBotMessage(input, conversationHistory);
      if (!botMessage) {
        throw new Error('No response from bot');
      }
      setMessages(prevMessages => [
        ...prevMessages,
        { text: botMessage, user: 'bot' },
      ]);
      setConversationHistory(prevChat => prevChat + `User: ${input}\n`);
    } catch (error) {
      console.error('Error fetching message:', error);
    } finally {
      setInput('');
    }
  };

  async function sendBotMessage(text: string, history: string) {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a Nice Gadget store helper who is greeting the user: Hello, 'I'm a Nice Gadget store helper, what product are you interested in? Nice Gadget Store is a project created by passionate software engineers available by link: https://github.com/fs-jan24-codeup/phone-catalog', after chatting casually about the products and providing with access to the following conversation history:\n${history}, pretend to only know about apple products, such as iphones (only iphone 7, 8, XS, XR, 11, 12, 13, 14 and their modifications), iPads (11, Air(4th Gen), Mini(5th and 6th Gen and their modifications), 10.2) and apple watch (SE, 3, 4, 5, 6 and their modifications), also list of all of them when user asks, when user asks about availability list everything. When user asks something tell you can only help with the products and information about them. Don't repeat hello everytime. When user wants to buy provide them this link: https://github.com/fs-jan24-codeup/phone-catalog and say they have to contact the owners. If user says something unrelated you have to say that you are sorry and can help only with products available, more info aboute Nice Gadget store and advice to contact the owners by link: https://github.com/fs-jan24-codeup/phone-catalog. You also know all the informations about these products, configurations, etc. Greet the user when he inputs hello or something like that. Ти можеш спілкуватися всіма доступними мовами. Ти розмовляєш мовою, якою до тебе звертаються, це важливо!.`,
        },
        { role: 'user', content: text },
      ],
      model: 'gpt-3.5-turbo',
    });
    return completion.choices[0].message.content;
  }

  useEffect(() => {
    const handleEscapeKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsChatOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKeyDown);

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyDown);
    };
  }, []);

  return (
    <div>
      <button
        className={`open-chat ${isChatOpen ? 'open' : ''}`}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen ? <CloseChat /> : <OpenChat />}
      </button>
      {isChatOpen && (
        <div className="modal" ref={modalRef} tabIndex={0}>
          <div className="modal-content" ref={modalContentRef}>
            <div className="modal-header">
              <div className="modal-assistant-wrapper">
                <div className="modal-assistant">
                  <Assistant className='modal-assistant__icon'/>
                </div>
                <p className="modal-assistant-status">Online</p>
              </div>
              <div className="close-chat-icon">
                <button
                  className="close-chat"
                  ref={closeButtonRef}
                  onClick={() => setIsChatOpen(false)}
                >
                  <CloseChat />
                </button>
              </div>
            </div>
            <div className="message-container">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.user}`}>
                  {message.text}
                </div>
              ))}
            </div>
            <div className="message-container__input">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Type a message..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
