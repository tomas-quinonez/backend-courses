CREATE SCHEMA courses;


CREATE TABLE courses.categories (
	idcategory serial NOT NULL,
	name varchar NOT NULL,
	description varchar NOT NULL,
	CONSTRAINT categories_pk PRIMARY KEY (idcategory)
);

CREATE TABLE courses.platforms (
	idplatform serial NOT NULL,
	name varchar NOT NULL,
	description varchar NOT NULL,
	CONSTRAINT platforms_pk PRIMARY KEY (idplatform)
);

CREATE TABLE courses.learningpaths (
	idpath serial NOT NULL,
	name varchar NOT NULL,
	description varchar NOT NULL,
	CONSTRAINT learningpaths_pk PRIMARY KEY (idpath)
);

CREATE TABLE courses.courses (
	idcourse serial NOT NULL,
	idcategory serial NOT NULL,
	idplatform serial NOT NULL,
	code int NOT NULL,
	name varchar NOT NULL,
	description varchar NOT NULL,
	duration int NOT NULL,
	cost float8 NOT NULL,
	level varchar NOT NULL,
	modality varchar NOT NULL,
	idpath int NULL,
	CONSTRAINT courses_pk PRIMARY KEY (idcourse),
	CONSTRAINT courses_categories_fk FOREIGN KEY (idcategory) REFERENCES courses.categories(idcategory),
	CONSTRAINT courses_platforms_fk FOREIGN KEY (idplatform) REFERENCES courses.platforms(idplatform),
	CONSTRAINT courses_learningpaths_fk FOREIGN KEY (idpath) REFERENCES courses.learningpaths(idpath)
);



INSERT INTO courses.categories
(idcategory, name, description)
VALUES(1, 'computacion', 'Categoria de computacion');

INSERT INTO courses.platforms
(idplatform, name, description)
VALUES(1, 'udemy', 'Plataforma de aprendizaje en línea');

INSERT INTO courses.courses
(idcourse, idcategory, idplatform, code, name, description, duration, cost, level, modality, idpath)
VALUES(1, 1, 1, 5, 'Programación full-stack', 'Curso de programación web full-stack', 18, 150000, 'principiante', 'virtual', NULL);

