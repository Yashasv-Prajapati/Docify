FROM frolvlad/alpine-python3

# Install necessary tools for networking
RUN apk update && \
    apk add --no-cache \
        curl \
        wget \
        iputils \
        bind-tools \
        git \
        && \
    rm -rf /var/cache/apk/*

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /usr/src/app

COPY ./code ./
#COPY ./received ./send
#COPY ./received ./send
#can't mount to a existing file in the container
#COPY ./received ./send
EXPOSE 8000

#CMD ["git","clone","https://github.com/nishad-dhuri-05/HiveLink.git"]
CMD ["python", "test.py"]