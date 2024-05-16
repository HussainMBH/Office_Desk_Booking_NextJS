-- DROP TABLE book_a_seat.seat_objs;

-- DROP TABLE book_a_seat.table_objs;

CREATE SCHEMA book_a_seat;

CREATE TABLE book_a_seat.table_objs (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	x float8 NOT NULL,
	y float8 NOT NULL,
	width float8 NOT NULL,
	height float8 NOT NULL
);


-- DROP TABLE book_a_seat.seat_objs;

CREATE TABLE book_a_seat.seat_objs (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	x float8 NOT NULL,
	y float8 NOT NULL
);


-- DROP TABLE book_a_seat.reservation;

CREATE TABLE book_a_seat.reservation (
	id serial4 NOT NULL,
	seat_id int4 NOT NULL,
	username varchar NOT NULL,
	start_date timestamp NOT NULL,
	end_date timestamp NOT NULL,
	CONSTRAINT reservation_pk PRIMARY KEY (id)
);



-- Sample of data

INSERT INTO book_a_seat.table_objs ("name",x,y,width,height) VALUES
	 ('table 2',49.0,17.0,166.0,38.0),
	 ('table 1',599.0,87.0,46.0,161.0);


INSERT INTO book_a_seat.seat_objs ("name",x,y) VALUES
	 ('chair 3',95.0,56.0),
	 ('chair 4',168.0,55.0),
	 ('chair 1',599.0,219.0),
	 ('chair 2',599.0,111.0);

-- DROP TABLE book_a_seat.users;

CREATE TABLE book_a_seat.users (
	id serial4 NOT NULL,
	username varchar NOT NULL UNIQUE,
	password varchar NOT NULL,
	role varchar NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY (id)
);

INSERT INTO book_a_seat.users (username, password, role) VALUES
	('admin0', '$2b$10$E6vTgDQyFh1Dhq7kGB/78.TCVODU4A2MiXpCwdDZQFnFrgHV4cZCO', 'admin'),
	('user1', '$2b$10$ANbC.vvD1V.Y/UH0pZ4XOeZAG9PqZ6x5.t6uAvcB4eBs4zldh3sXq', 'user'),
	('anika', '$2b$10$Zi9ElMaXG4b5KdEyrh7/ROEIsR9qEJgOw3xHz2wI9SmxKhQk5Pv12', 'admin'),
	('user3', '$2b$10$RkGk.Kg0RjH7E5QyK7zFeOdVXsFVUC5zKbcDJaHov.5PbY5l/pU8G', 'user');