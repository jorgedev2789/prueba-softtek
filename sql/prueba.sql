CREATE TABLE `species` (
  `id` int NOT NULL,
  `uuid` varchar(150) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `clasificacion` varchar(50) NOT NULL,
  `designacion` varchar(50) NOT NULL,
  `alturaPromedio` varchar(20) NOT NULL,
  `colorPiel` varchar(150) NOT NULL,
  `colorPelo` varchar(150) NOT NULL,
  `colorOjos` varchar(150) NOT NULL,
  `promedioVida` varchar(20) NOT NULL,
  `habitad` varchar(50) NOT NULL,
  `idioma` varchar(150) NOT NULL,
  `url` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indices de la tabla `species`
--
ALTER TABLE `species`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `species`
--
ALTER TABLE `species`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;
