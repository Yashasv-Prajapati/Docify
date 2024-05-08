FROM ubuntu:22.04
WORKDIR /app
COPY . /app
# Install OpenJDK 11 and other required packages
RUN apt-get update && \
    apt-get install -y openjdk-11-jdk \
                       git \
                       wget \
                       unzip \
                       && rm -rf /var/lib/apt/lists/*
RUN apt-get install -y python3 
# Add the JaCoCo plugin to build.gradle.kts
RUN sed -i '/plugins {/a \\    jacoco' app/build.gradle.kts