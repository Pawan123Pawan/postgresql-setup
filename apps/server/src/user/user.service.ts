import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

export interface CreateUserDto {
  name: string;
  email: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async createUser(data: CreateUserDto) {
    const result = await this.db.query(
      `INSERT INTO users (name, email)
       VALUES ($1, $2)
       RETURNING *`,
      [data.name, data.email],
    );

    return result[0];
  }

  async getAllUsers() {
    return this.db.query(`SELECT * FROM users ORDER BY id DESC`);
  }

  async getUserById(id: number) {
    const result = await this.db.query(`SELECT * FROM users WHERE id = $1`, [
      id,
    ]);

    return result[0];
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const fields = [];
    const values = [];
    let index = 1;

    if (data.name) {
      fields.push(`name = $${index++}`);
      values.push(data.name);
    }

    if (data.email) {
      fields.push(`email = $${index++}`);
      values.push(data.email);
    }

    values.push(id);

    const query = `
      UPDATE users
      SET ${fields.join(', ')}
      WHERE id = $${index}
      RETURNING *
    `;

    const result = await this.db.query(query, values);
    return result[0];
  }

  async deleteUser(id: number) {
    const result = await this.db.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [id],
    );

    return result[0];
  }
}
