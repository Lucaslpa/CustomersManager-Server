import { ClientsTypes } from '../../types/Clients';
import { Model } from '../../db/Schemas/Clients';

export class ClientsModel {
  private clientsModel;

  constructor(model: Model) {
    this.clientsModel = model;
  }

  async add(client: ClientsTypes) {
    const res = await this.clientsModel.create(client);

    return res;
  }

  async delete(id: string) {
    const res = await this.clientsModel.deleteOne({
      _id: id,
    });
    return res;
  }

  async update(id: string, newClient: ClientsTypes) {
    const res = await this.clientsModel.updateOne({ _id: id }, newClient);
    return res;
  }

  async get(id: string) {
    const res = await this.clientsModel.findById(id);
    return res;
  }

  async getByCpf(cpf: string) {
    try {
      const res = await this.clientsModel.findOne({ cpf });
      return res;
    } catch (err) {
      return 'error';
    }
  }

  async getMany(page: number) {
    const options = {
      page,
      limit: 5,
      customLabels: { totalPages: 'pageCount' },
      sort: { created_at: -1 },
    };
    const res = await this.clientsModel.paginate({}, options);
    return res;
  }

  async deleteMany(ids: string[]) {
    const res = await this.clientsModel.deleteMany({ _id: { $in: ids } });
    return res;
  }
}
