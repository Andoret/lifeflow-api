import { Injectable,InternalServerErrorException} from '@nestjs/common';
import { KitchenRepository } from './kitchen.repository';
import { CreateKitchenRequestDto } from './dto/create-kitchen-request.dto';
import { GoogleGenerativeAI,SchemaType} from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY no está definida');
}

const genAI = new GoogleGenerativeAI(apiKey);


@Injectable()
export class KitchenService {
  
  constructor(private readonly kitchenRepository: KitchenRepository) {}
  
  async create(userId: number, dto: CreateKitchenRequestDto) {
    const model = genAI.getGenerativeModel({model: 'gemini-3.5-flash-lite'});
      const prompt = `
    Tengo estos ingredientes: ${dto.ingredients.join(', ')}.
    Dame UNA receta usando la mayoría de ellos.
    Responde SOLO con JSON válido, sin texto adicional, con esta forma exacta:
    { "nombre": string, "ingredientes": string[], "pasos": string[], "tiempoMinutos": number }
  `;

   const result = await model.generateContent(prompt);
    const text = result.response.text();
     const recipe = JSON.parse(text.replace(/```json|```/g, '').trim());
     console.log('receta',recipe)
    return this.kitchenRepository.create(userId, dto.ingredients, JSON.stringify(recipe));
  }

  findByUser(userId: number) {
    return this.kitchenRepository.findByUser(userId);
  }

  findById(kitchenRequestId: number, userId: number) {
    return this.kitchenRepository.findByIdAndUser(kitchenRequestId, userId);
  }

  delete(kitchenRequestId: number, userId: number) {
    return this.kitchenRepository.delete(kitchenRequestId, userId);
  }
}


