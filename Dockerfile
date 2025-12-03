FROM debian:bookworm

# Install Chrome dependencies
RUN apt-get update && apt-get install -y \
    wget gnupg ca-certificates \
    fonts-liberation libasound2 \
    libatk-bridge2.0-0 libatk1.0-0 libatspi2.0-0 \
    libcups2 libdrm2 libgbm1 libgtk-3-0 \
    libnspr4 libnss3 libu2f-udev \
    libxcomposite1 libxdamage1 libxfixes3 \
    libxkbcommon0 libxrandr2 libxshmfence1 xdg-utils \
    --no-install-recommends

# Add Chrome repository
RUN wget -q -O /usr/share/keyrings/google-key.gpg https://dl.google.com/linux/linux_signing_key.pub && \
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-key.gpg] http://dl.google.com/linux/chrome/deb/ stable main" \
      > /etc/apt/sources.list.d/google.list

# Install Chrome
RUN apt-get update && apt-get install -y google-chrome-stable --no-install-recommends

# Install NodeJS (FAST method)
RUN apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy all files
COPY . .

# Expose port for Render
EXPOSE 3000

CMD ["node", "main.js"]
