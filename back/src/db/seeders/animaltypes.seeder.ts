import { DataSource } from 'typeorm';
import { AnimalTypes } from '../../animaltype/entities/animaltypes.entity';

export class AnimalTypesSeeder {
  public async run(dataSource: DataSource): Promise<void> {
    const fs = require('fs');
    const path = require('path');

    const itemsRepository = dataSource.getRepository(AnimalTypes);

    // Leer el archivo JSON
    const itemsJsonPath = path.join(__dirname, './animaltypes.json'); // Cambiar la ruta si es necesario y el nombre del archivo
    const itemsData = JSON.parse(fs.readFileSync(itemsJsonPath, 'utf8'));

    console.log(itemsData)
    // Insertar los datos en la base de datos
    await itemsRepository.save(itemsData);

    console.log('Datos agregados correctamente.');
  }
}
