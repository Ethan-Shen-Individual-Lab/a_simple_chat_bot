const API_KEY = '?';   #填入你的大模型API Key
const BOT_AVATAR = '39abc5e90627cb6bded3c6686715bb2.jpg';   #别用我的头像，输入你喜欢的图片变成机器人的头像(记得把图片放到根目录里)

class ChatBot {
    constructor() {
        this.messageContainer = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-input');
        this.sendButton = document.getElementById('send-button');
        this.modelSelect = document.getElementById('model-select');

        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // 添加欢迎消息
        this.addMessage('你好！我是千问AI助手，请问有什么可以帮你的？', false);
    }

    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // 添加用户消息
        this.addMessage(message, true);
        this.userInput.value = '';

        // 获取选中的模型
        const selectedModel = this.modelSelect.value;

        try {
            // 添加等待提示
            const loadingMessage = '正在思考中...';
            const loadingDiv = this.addMessage(loadingMessage, false);
            
            const response = await this.callAPI(message, selectedModel);
            
            // 移除加载消息
            this.messageContainer.removeChild(loadingDiv);
            
            // 添加AI响应
            this.addMessage(response, false);
        } catch (error) {
            console.error('API调用错误:', error);
            this.addMessage(`抱歉，发生了错误：${error.message}`, false);
        }
    }

    async callAPI(message, model) {
        try {
            console.log('发送请求到API，模型:', model);
            const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant.'
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('API响应错误:', errorData);
                throw new Error(`API错误: ${errorData.message || '未知错误'}`);
            }

            const data = await response.json();
            console.log('API响应:', data);
            
            if (data.choices && data.choices[0] && data.choices[0].message) {
                return data.choices[0].message.content;
            } else {
                throw new Error('API返回格式不正确');
            }
        } catch (error) {
            console.error('详细错误信息:', error);
            throw error;
        }
    }

    addMessage(content, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : ''}`;

        const avatar = document.createElement('img');
        avatar.className = 'message-avatar';
        avatar.src = isUser ? 'https://ui-avatars.com/api/?name=User' : BOT_AVATAR;
        avatar.onerror = () => {
            avatar.src = 'https://ui-avatars.com/api/?name=AI';  // 头像加载失败时的替代图片
        };

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        this.messageContainer.appendChild(messageDiv);
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
        
        return messageDiv;  // 返回消息div元素以支持加载状态的移除
    }
}

// 初始化聊天机器人
document.addEventListener('DOMContentLoaded', () => {
    new ChatBot();
}); 
