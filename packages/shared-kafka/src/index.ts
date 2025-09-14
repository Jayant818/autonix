import { Kafka, Producer } from "kafkajs";

export class KafkaProducer {
  private static instance: KafkaProducer;
  private KafkaProducer: Producer;

  private constructor() {
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["kafka:9092"],
    });

    this.KafkaProducer = kafka.producer();
    this.KafkaProducer.connect();
  }

  public static getInstance(): KafkaProducer {
    if (!KafkaProducer.instance) {
      KafkaProducer.instance = new KafkaProducer();
    }
    return KafkaProducer.instance;
  }

  public getProducer() {
    return this.KafkaProducer;
  }
}
