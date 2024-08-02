import { DeepPartial, Repository } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TEntity extends AbstractEntity> {
  constructor(protected readonly repository: Repository<TEntity>) {}

  async create(entityData: DeepPartial<TEntity>) {
    const data = this.repository.create(entityData);
    await this.repository.save(data);
    return data;
  }

  async findOne(filterQuery: any) {
    const entityData = await this.repository.findOne({ where: filterQuery });
    if (!entityData) {
      throw new NotFoundException('No data found.');
    }
    return entityData;
  }

  async findOneAndUpdate(filterQuery: any, update: DeepPartial<TEntity>) {
    const entityData = await this.findOne(filterQuery);
    Object.assign(entityData, update);
    this.repository.save(entityData);
    return entityData;
  }

  async find(filterQuery: any) {
    return await this.repository.find(filterQuery);
  }

  async findOneAndDelete(filterQuery: any) {
    const entityData = await this.findOne(filterQuery);
    return await this.repository.remove(entityData);
  }
}
