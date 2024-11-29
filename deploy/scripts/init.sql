CREATE DATABASE IF NOT EXISTS javaweb;
USE javaweb;

-- Establecer la zona horaria a Ecuador (America/Guayaquil)
SET GLOBAL time_zone = 'America/Guayaquil';
SET time_zone = 'America/Guayaquil';

-- Crear la tabla `cafeteria`
CREATE TABLE IF NOT EXISTS cafeteria (
                                         id INT AUTO_INCREMENT PRIMARY KEY,
                                         fecha DATE NOT NULL,
                                         categoria VARCHAR(255) NOT NULL,
                                         nombrePlato VARCHAR(255) NOT NULL,
                                         descripcion VARCHAR(255) NOT NULL,
                                         precio DECIMAL(10, 2) NOT NULL
)ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO cafeteria (fecha, categoria, nombrePlato, descripcion, precio)
VALUES
    ('2024-11-18', 'Almuerzos', 'Almuerzo Estudiantil', 'Entrada: Ensalada mixta, Plato Fuerte: Pollo al horno, Bebida: Jugo de maracuyá, Postre: Flan', 2.50),
    ('2024-11-18', 'Almuerzos', 'Almuerzo Premium', 'Entrada: Sopa de verduras, Plato Fuerte: Pescado al vapor, Bebida: Agua de piña, Postre: Tarta de manzana', 3.25),
    ('2024-11-18', 'Desayunos', 'Desayuno Básico', 'Avena, Pan de leche, Café o Té', 1.00),
    ('2024-11-18', 'Desayunos', 'Desayuno Completo', 'Tortilla de huevos, Pan de pita, Jugo de naranja', 2.25),
    ('2024-11-18', 'Snacks', 'Empanada de pollo', 'Empanada rellena de pollo desmenuzado', 2.50),
    ('2024-11-19', 'Almuerzos', 'Almuerzo Estudiantil', 'Entrada: Ensalada de frutas, Plato Fuerte: Lomo de cerdo al grill, Bebida: Limonada, Postre: Brownie', 2.50),
    ('2024-11-19', 'Almuerzos', 'Almuerzo Premium', 'Entrada: Crema de zanahoria, Plato Fuerte: Pechuga de pavo, Bebida: Jugo de uva, Postre: Helado', 3.00),
    ('2024-11-19', 'Desayunos', 'Desayuno Básico', 'Huevos estrellados, Pan tostado, Café o Té', 1.00),
    ('2024-11-19', 'Desayunos', 'Desayuno Completo', 'Yogurt con granola, Pan de chocolate, Jugo de manzana', 1.00),
    ('2024-11-19', 'Snacks', 'Pan de yuca', 'Panecillo de yuca con queso', 2.50),
    ('2024-11-20', 'Almuerzos', 'Almuerzo Estudiantil', 'Entrada: Sopa de pollo, Plato Fuerte: Arroz con mariscos, Bebida: Jugo de naranja, Postre: Pudín de vainilla', 2.50),
    ('2024-11-20', 'Almuerzos', 'Almuerzo Premium', 'Entrada: Ensalada César, Plato Fuerte: Bife de chorizo, Bebida: Jugo de mandarina, Postre: Tiramisu', 3.00),
    ('2024-11-20', 'Desayunos', 'Desayuno Básico', 'Huevos revueltos con tomate, Pan de ajo, Café o Té', 1.00),
    ('2024-11-20', 'Desayunos', 'Desayuno Completo', 'Tostadas francesas, Jugo de fresa, Café o Té', 1.00),
    ('2024-11-20', 'Snacks', 'Empanada de queso', 'Empanada de queso fresco', 2.50),
    ('2024-11-21', 'Almuerzos', 'Almuerzo Estudiantil', 'Entrada: Ensalada de aguacate, Plato Fuerte: Pechuga de pollo a la parrilla, Bebida: Jugo de guanábana, Postre: Pastelito de manzana', 8.50),
    ('2024-11-21', 'Almuerzos', 'Almuerzo Premium', 'Entrada: Crema de champiñones, Plato Fuerte: Filete de res al vino tinto, Bebida: Jugo de mora, Postre: Flan de leche', 12.00),
    ('2024-11-21', 'Desayunos', 'Desayuno Básico', 'Bocadillos de jamón y queso, Jugo de naranja, Café o Té', 2.00),
    ('2024-11-21', 'Desayunos', 'Desayuno Completo', 'Croissant con mermelada, Jugo de piña, Café o Té', 2.00),
    ('2024-11-21', 'Snacks', 'Cachito de jamón', 'Cachito relleno de jamón y queso', 2.50),
    ('2024-11-16', 'Almuerzos', 'Almuerzo Estudiantil', 'Entrada: Ensalada de tomate y pepino, Plato Fuerte: Pollo al curry, Bebida: Limonada con hierba luisa, Postre: Gelatina de frutas', 8.50),
    ('2024-11-16', 'Almuerzos', 'Almuerzo Premium', 'Entrada: Crema de espárragos, Plato Fuerte: Pavo al horno, Bebida: Jugo de arándano, Postre: Mousse de chocolate', 12.00),
    ('2024-11-16', 'Desayunos', 'Desayuno Básico', 'Tostadas con aguacate, Café o Té', 2.00),
    ('2024-11-16', 'Desayunos', 'Desayuno Completo', 'Huevos pochados, Pan de centeno, Jugo de tomate', 2.00),
    ('2024-11-16', 'Snacks', 'Bocadillo de pollo', 'Bocadillo de pollo con mayonesa', 2.50),
    ('2024-11-22', 'Almuerzos', 'Almuerzo Estudiantil', 'Entrada: Ensalada de tomate y pepino, Plato Fuerte: Pollo al curry, Bebida: Limonada con hierba luisa, Postre: Gelatina de frutas', 8.50),
    ('2024-11-16', 'Almuerzos', 'Almuerzo Premium', 'Entrada: Crema de espárragos, Plato Fuerte: Pavo al horno, Bebida: Jugo de arándano, Postre: Mousse de chocolate', 12.00),
    ('2024-11-22', 'Desayunos', 'Desayuno Básico', 'Tostadas con aguacate, Café o Té', 3.00),
    ('2024-11-22', 'Desayunos', 'Desayuno Completo', 'Huevos pochados, Pan de centeno, Jugo de tomate', 3.00),
    ('2024-11-22', 'Snacks', 'Bocadillo de pollo', 'Bocadillo de pollo con mayonesa', 2.50);

-- Crear la tabla `buses`
CREATE TABLE buses
(
    id_bus      bigint unsigned NOT NULL AUTO_INCREMENT,
    ruta        varchar(100) DEFAULT NULL,
    paradas     varchar(250) DEFAULT NULL,
    horario     varchar(32)  DEFAULT NULL,
    ubicacion   varchar(100) DEFAULT NULL,
    mapa_url    TEXT,
    PRIMARY KEY (id_bus),
    UNIQUE KEY id_bus (id_bus)
) ENGINE = InnoDB
  AUTO_INCREMENT = 5
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;


INSERT INTO buses
VALUES
    (4, 'Quitumbe', 'EPN, Ladrón de Guevara, Av. Patria, Pérez Guerrero, Bolivia, Av. Universitaria, Av. Mariscal Sucre, Michelena, Av. Teniente Hugo Ortiz, Av. Cardenal de la Torre, Guanando, Cusubamba, Av. Mariscal Sucre, Cóndor Ñan hasta el terminal Quitumbe.',
     '6:50 AM - 8:00 PM', 'Teatro', 'https://www.google.com/maps/embed?pb=!1m76!1m12!1m3!1d63836.48788618437!2d-78.5657257442096!3d-0.24949680255762124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m61!3e0!4m5!1s0x91d59a107e1cd44b%3A0x88a284f66939ed4!2sEPN%2C%20Avenida%20Ladr%C3%B3n%20de%20Guevara%2C%20Quito!3m2!1d-0.2124413!2d-78.4905842!4m5!1s0x91d59a1637018127%3A0xfaae0999ceb75bde!2sAvenida%20Patria%2C%20Quito!3m2!1d-0.20782989999999998!2d-78.4968808!4m5!1s0x91d59a3dde813785%3A0x2cce0875d91d95ce!2sAv.%20Perez%20Guerrero%2C%20Quito!3m2!1d-0.204584!2d-78.50039509999999!4m5!1s0x91d59a389213b79d%3A0xd83e9259be243bcc!2sBolivia%2C%20Quito!3m2!1d-0.2027909!2d-78.50500029999999!4m5!1s0x91d59a39040e52a1%3A0x60aefca84e35cbc0!2sAv.%20Universitaria%2C%20Quito!3m2!1d-0.2050685!2d-78.50750459999999!4m5!1s0x91d5997ff408676b%3A0xbe731fba57be847e!2sAv.%20Mariscal%20Sucre%2C%20Quito!3m2!1d-0.2473782!2d-78.5353159!4m5!1s0x91d5991abd38143f%3A0xaee3c9ecffe1d7f5!2sAv.%20Michelena%2C%20Quito!3m2!1d-0.2480751!2d-78.5335449!4m5!1s0x91d598fb679d3a11%3A0x67c9468ba08824b3!2sAv.%20Tnte.%20Hugo%20Ortiz%2C%20Quito!3m2!1d-0.26445009999999997!2d-78.53187369999999!4m5!1s0x91d598e8066b103b%3A0xff0b272abca32794!2sAv.%20Cardenal%20de%20la%20Torre%2C%20Quito!3m2!1d-0.26291739999999997!2d-78.5383818!4m5!1s0x91d5a207ab741411%3A0x31bedd7cb65c9bde!2sTerminal%20Terrestre%20Quitumbe%20-%20Quito%20Sur%2C%20Av.%20Mariscal%20Sucre%2C%20Quito!3m2!1d-0.2963745!2d-78.55664159999999!5e0!3m2!1ses-419!2sec!4v1731188682163!5m2!1ses-419!2sec'),
   (10, 'Condado Shopping', 'EPN, Andalucia, 12 de Octubre, Av. Patria, Av. Perez Guerrero, La Bolivia, Av Universitaria, Av. Mariscal sucre
     Av. Occidental, Av. Mariscal Sucre, San José del Condado, Av. De la Prensa.',
     '6:50 AM - 8:00 PM', 'Sistemas', 'https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d3259.5075421622932!2d-78.49372392265681!3d-0.10414780029908699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d-0.2100177!2d-78.4890258!4m5!1s0x91d58f8c44d66223%3A0x2c91bf3e204c1c09!2sCondado%20Shopping%2C%20Av.%20Mariscal%20Sucre%2C%20Quito!3m2!1d-0.10434679999999999!2d-78.4913996!5e0!3m2!1ses-419!2sec!4v1731767872936!5m2!1ses-419!2sec'),
    (3, 'Comite del pueblo', 'Andalucia, Av Patria, Av. América, Av. 10 de Agosto, Av, de la Prensa, Av. Jorge Garces', '6:50 AM - 8:00 PM', 'Sistemas', 'https://www.google.com/maps/embed?pb=!1m48!1m12!1m3!1d13420.061075699981!2d-78.47960749033683!3d-0.13013751287221495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m33!3e0!4m3!3m2!1d-0.2101747!2d-78.4894326!4m5!1s0x91d59a1637018127%3A0xfaae0999ceb75bde!2sAvenida%20Patria%2C%20Quito!3m2!1d-0.20782989999999998!2d-78.4968808!4m5!1s0x91d59a3c1c943d25%3A0x154758c2c292a61a!2sAv.%20Am%C3%A9rica%2C%20170129%20Quito!3m2!1d-0.1880686!2d-78.49595769999999!4m5!1s0x91d59aa32f6932a5%3A0x9567df6f01c21342!2sAv.%2010%20de%20Agosto%2C%20170521%20Quito!3m2!1d-0.18847709999999998!2d-78.4921147!4m5!1s0x91d58542dff375cb%3A0x42bb616769bbd81b!2sAv.%20de%20la%20Prensa%2C%20170104%20Quito!3m2!1d-0.1351972!2d-78.49370859999999!4m3!3m2!1d-0.12048729999999999!2d-78.4654303!5e0!3m2!1ses-419!2sec!4v1731768693458!5m2!1ses-419!2sec'),
    (18, 'Estación El Recreo', 'EPN, Av. Ladrón de Guevara , Av. Velasco Ibarra, Av. Napo, Av. Pedro Maldonado, Estación El Recreo.',
     '6:50 AM - 8:00 PM', 'Teatro', 'https://www.google.com/maps/embed?pb=!1m40!1m12!1m3!1d31918.269623726846!2d-78.51741761763492!3d-0.23867584284919183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m25!3e0!4m5!1s0x91d59a107e1cd44b%3A0x88a284f66939ed4!2sEPN%2C%20Avenida%20Ladr%C3%B3n%20de%20Guevara%2C%20Quito!3m2!1d-0.2124413!2d-78.4905842!4m3!3m2!1d-0.21560269999999998!2d-78.4908821!4m3!3m2!1d-0.2376587!2d-78.50923139999999!4m3!3m2!1d-0.2459429!2d-78.5196485!4m5!1s0x91d599074de788f7%3A0x9a7b61c31c35ee8b!2sTerminal%20El%20Recreo%20(Parada)%2C%20Quito!3m2!1d-0.2519058!2d-78.5214481!5e0!3m2!1ses-419!2sec!4v1731201968360!5m2!1ses-419!2sec');

ALTER DATABASE javaweb CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;



