import { useState, useEffect, useRef } from 'react';
import { FiMic, FiMicOff, FiSend, FiDownload } from 'react-icons/fi';

const CreateNFTPage = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([]);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const result = event.results[current];
        const transcriptText = result[0].transcript;
        setTranscript(transcriptText);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    } else {
      console.error('Speech recognition not supported in this browser');
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      
      if (transcript) {
        handleSendMessage();
      }
    } else {
      setTranscript('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSendMessage = () => {
    if (!transcript.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      text: transcript,
      sender: 'user',
    };
    
    setMessages(prev => [...prev, userMessage]);
    setTranscript('');
    
    // Simulate AI response and image generation
    setIsGenerating(true);
    
    // Add AI thinking message
    const aiThinkingMessage = {
      id: Date.now() + 1,
      text: 'Generating your NFT...',
      sender: 'ai',
      isLoading: true,
    };
    
    setMessages(prev => [...prev, aiThinkingMessage]);
    
    // Simulate API call delay
    setTimeout(() => {
      // Remove thinking message
      setMessages(prev => prev.filter(msg => !msg.isLoading));
      
      // Add AI response
      const aiMessage = {
        id: Date.now() + 2,
        text: `I've created an NFT based on "${userMessage.text}". What do you think?`,
        sender: 'ai',
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Generate a placeholder image (in a real app, this would be from an AI API)
      const imageUrl = `https://via.placeholder.com/512x512/4F7DF3/FFFFFF?text=${encodeURIComponent(userMessage.text.substring(0, 20))}`;
      setGeneratedImage(imageUrl);
      setIsGenerating(false);
    }, 3000);
  };

  const handleInputChange = (e) => {
    setTranscript(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `nft-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Your NFT</h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              Describe the NFT you want to create using your voice or text. Our AI will generate an image based on your description.
            </p>
            
            {/* Chat Messages */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4 h-80 overflow-y-auto">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div 
                    className={`inline-block rounded-lg px-4 py-2 max-w-xs sm:max-w-md ${
                      message.sender === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200 text-gray-800'
                    } ${message.isLoading ? 'animate-pulse' : ''}`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Generated Image */}
            {generatedImage && (
              <div className="mb-6">
                <div className="relative">
                  <img 
                    src={generatedImage || "/placeholder.svg"} 
                    alt="Generated NFT" 
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                  <button 
                    className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                    onClick={handleDownload}
                  >
                    <FiDownload className="text-gray-700" />
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <button 
                    className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
                    onClick={() => alert('NFT minted successfully!')}
                  >
                    Mint this NFT
                  </button>
                </div>
              </div>
            )}
            
            {/* Input Area */}
            <div className="flex items-center space-x-2">
              <button 
                className={`p-3 rounded-full ${
                  isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                } hover:opacity-90 transition-colors`}
                onClick={toggleListening}
              >
                {isListening ? <FiMicOff /> : <FiMic />}
              </button>
              <input
                type="text"
                value={transcript}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? 'Listening...' : 'Type your description or use voice input...'}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isListening || isGenerating}
              />
              <button 
                className="p-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50"
                onClick={handleSendMessage}
                disabled={!transcript.trim() || isGenerating}
              >
                <FiSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFTPage;