FROM golang:1.24.4-alpine AS builder

WORKDIR /app

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o ./oauth .


FROM alpine:3.20
WORKDIR /app

COPY --from=builder /app/oauth .
CMD ["./oauth"]

EXPOSE 3000
