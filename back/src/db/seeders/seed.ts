import { AnimalTypesSeeder } from './animaltypes.seeder';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../data-source';
import { UserSeeder } from './user.seeder';
import { AnimalFeaturesSeeder } from './animalfeatures.seeder';

export const AppDataSource = new DataSource(dataSourceOptions);
AppDataSource.initialize()
    .then(() => {
        console.log('Conexión a la base de datos establecida');
        // Aquí puedes iniciar tu servidor o ejecutar tu seeder
    })
    .catch((error) => console.error('Error al conectar a la base de datos', error));

async function runSeeders() {
    const dataSource = await AppDataSource.initialize();

    // Agregamos Usuario Base
    const usersSeeder = new UserSeeder();
    await usersSeeder.run(dataSource);

    // Agregamos Tipos de Animales Base
    const animaltypes = new AnimalTypesSeeder();
    await animaltypes.run(dataSource);

    // Agregamos Tipos de Caracteristicas de Animales
    const animalfeatures = new AnimalFeaturesSeeder();
    await animalfeatures.run(dataSource);
    await dataSource.destroy();

}

runSeeders().catch((error) => console.error('Error al ejecutar el seeder:', error));
