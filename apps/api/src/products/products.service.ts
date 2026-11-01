import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private readonly products = [
    {
      id: 1,
      name: 'Cà phê sữa',
      price: 25000,
      image: '/images/ca-phe-sua.jpg',
    },
    {
      id: 2,
      name: 'Bạc xỉu',
      price: 30000,
      image: '/images/bac-xiu.jpg',
    },
    {
      id: 3,
      name: 'Trà đào cam sả',
      price: 35000,
      image: '/images/tra-dao.jpg',
    },
  ];

  findAll() {
    return this.products;
  }
  findOne(id: number) {
  return this.products.find((product) => product.id === id);
}
}