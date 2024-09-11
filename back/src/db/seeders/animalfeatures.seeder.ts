import { DataSource } from 'typeorm';
import { AnimalFeatures } from '../../animalfeatures/entities/animalfeatures.entity';

export class AnimalFeaturesSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const fs = require('fs');
    const path = require('path');

    const itemsRepository = dataSource.getRepository(AnimalFeatures);

    // Leer el archivo JSON
    const itemsJsonPath = path.join(__dirname, './animalfeatures.json'); // Cambiar la ruta si es necesario y el nombre del archivo
    const itemsData = JSON.parse(fs.readFileSync(itemsJsonPath, 'utf8'));

    console.log(itemsData)
    // Insertar los datos en la base de datos
    await itemsRepository.save(itemsData);

    console.log('Datos agregados correctamente.');
  }
}
