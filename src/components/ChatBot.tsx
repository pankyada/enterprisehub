import { useState } from 'react';
import { Ollama } from 'ollama';
import Markdown from 'react-markdown'
import {
    Card,
    CardContent,
    // CardDescription,
    // CardFooter,
    // CardHeader,
    CardTitle,
} from "@/components/ui/card"
// import { set } from 'react-hook-form';


interface Message {
    role: 'user' | 'ollama';
    content: string;
}

const ollamaCustom = new Ollama({ host: 'http://localhost:11434' })

const ChatBot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [ollamaResponse, setOllamaResponse] = useState<string>('');
    const handleSendMessage = async (message: string) => {
        if (!message) return;
        const userMessage: Message = { role: 'user', content: message };
        setMessages(messages => [...messages, userMessage]);
        await getOllamaResp(message);
    };


    const getOllamaResp = async (userInput: string) => {
        const response = await ollamaCustom.chat({
            model: 'llama3',
            messages: [...messages, { role: 'user', content: userInput }],
            stream: true
        });
        setOllamaResponse('')
        for await (const part of response) {
            setOllamaResponse(msg => msg + part.message.content)
            // process.stdout.write(part.message.content)
        }
        // console.log(response)
        // if (response.data && response.data.messages) {
        //     const ollamaMessage = { role: 'ollama', content: response.data.messages[0].content };
        //     setMessages(messages => [...messages, ollamaMessage]);
        // }
    }

    return (
        <div className='h-screen'>
            <div className="p-4 mx-auto bg-white rounded-lg border shadow-md w-full h-4/5">
                {/* <div className="mb-2">
                    {messages.map((msg, index) => (
                        <div key={index} className={`text-sm text-gray-900 ${msg.role === 'ollama' ? 'text-blue-500' : 'text-black'}`}>
                            {msg.role === 'user' ? 'You: ' : 'Ollama: '}{msg.content}
                        </div>
                    ))}
                </div> */}
                <input
                    type="text"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage((e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = ''; // clear input after sending
                        }
                    }}
                    className="w-full p-2 border rounded-md"
                    placeholder="Type a message..."
                />

                <div className='pt-10'>
                    <Card>
                        <CardTitle className='pt-7'>Response from Ollama</CardTitle>
                        <CardContent className='pt-5'>
                            <hr></hr>
                            <Markdown className='pt-5 text-justify'>
                                {ollamaResponse}
                            </Markdown>
                            {/* {messages.map((msg, index) => (
                                <div key={index} className={`text-sm text-gray-900 ${msg.role === 'ollama' ? 'text-blue-500' : 'text-black'}`}>
                                    <Markdown>{msg.content}</Markdown>
                                    {msg.role === 'user' ? 'You: ' : 'Ollama: '}{msg.content}
                                </div>
                            ))} */}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
