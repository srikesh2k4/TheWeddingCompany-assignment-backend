FROM python:3.11-slim

# System dependencies needed for bcrypt & MongoDB
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libffi-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /backend/app

# Copy requirements ONLY first (to use Docker cache)
COPY /backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Now copy the entire backend project
COPY . .

# Ensure Python can find the /app folder
ENV PYTHONPATH=/backend/app
ENV PYTHONUNBUFFERED=1

# Command to start backend
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
