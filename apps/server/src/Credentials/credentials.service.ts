import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credentials } from '@repo/db/src/entities/Credentials.entity';
import { Repository } from 'typeorm';
import { CreateCredentialsDTO } from './DTO/create-credentials.dto';
import { decrypt, encrypt } from 'src/common/utils/aes-encryption';

@Injectable()
export class CredentialsService {
  constructor(
    @InjectRepository(Credentials)
    private readonly credentialsRepository: Repository<Credentials>,
  ) {}

  async getCredentials(id: number) {
    const userCredentials = await this.credentialsRepository.find({
      where: {
        user: {
          id,
        },
      },
    });

    userCredentials.forEach((cred) => {
      const decryptedData = JSON.parse(decrypt(cred.data as any));
      cred.data = decryptedData;
    });

    return userCredentials;
  }

  async getCredentialsById(id: number) {
    const userCredentials = await this.credentialsRepository.findOne({
      where: {
        id,
      },
    });

    const decryptedData = JSON.parse(decrypt(userCredentials.data as any));

    return {
      ...userCredentials,
      data: decryptedData,
    };
  }

  async createCredentials(data: CreateCredentialsDTO) {
    const encrptedData = encrypt(JSON.stringify(data.data));

    const userCred = this.credentialsRepository.create({
      ...data,
      data: encrptedData,
    });
    return this.credentialsRepository.save(userCred);
  }

  async deleteCredentials(id: number) {
    return this.credentialsRepository.delete(id);
  }
}
