-- DROP TABLE book_a_seat.seat_objs;

-- DROP TABLE book_a_seat.table_objs;

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

