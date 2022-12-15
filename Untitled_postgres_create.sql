CREATE TABLE public.users (
	"_id" serial NOT NULL,
	"google_identity" varchar,
	"email" varchar NOT NULL,
	"firstname" varchar,
	"hash" varchar,
	"salt" varchar,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE public.workouts (
	"workout_type" varchar NOT NULL,
	"workout_details" varchar NOT NULL,
	"workouts_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"athlete_notes" varchar NOT NULL,
	"workout_status" boolean NOT NULL,
	CONSTRAINT "workouts_pk" PRIMARY KEY ("workouts_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE public.workouts ADD CONSTRAINT "workouts_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");



