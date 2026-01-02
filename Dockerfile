# --- Dev image for Next.js + TS (npm) ---
FROM node:20-slim

# Workdir
WORKDIR /app

# Helpful envs for dev / hot-reload
ENV NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000 \
    # Improves file watching when using bind mounts (especially on Windows/Mac)
    CHOKIDAR_USEPOLLING=true \
    WATCHPACK_POLLING=true

# Install deps first (better Docker cache)
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest (for first build; during dev you'll mount the source)
COPY . .

# Expose Next dev port
EXPOSE 3000

# Run the dev server
CMD [ "npm", "run", "dev" ]
