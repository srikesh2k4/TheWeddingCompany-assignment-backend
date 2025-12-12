FROM python:3.11-slim

# Dependencies for bcrypt + MongoDB drivers
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libffi-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Create working directory inside container
WORKDIR /app

# First copy only requirements.txt for caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Now copy the backend code
COPY . .

# Ensure Python can find app/
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# Expose port (optional, Railway auto-detects)
EXPOSE 8000

# Start FastAPI
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
