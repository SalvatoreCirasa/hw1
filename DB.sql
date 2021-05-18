

CREATE DATABASE Sicilyexpress;

USE Sicilyexpress;


CREATE TABLE users (
 id INTEGER(11) NOT NULL AUTO_INCREMENT,
 nome_utente VARCHAR(15) NOT NULL,
 cognome_utente VARCHAR(15) NOT NULL,
 username VARCHAR(15) NOT NULL,
 password VARCHAR(70) NOT NULL,
 e_mail VARCHAR(30) NOT NULL,
 Residenza_Città VARCHAR(12) NOT NULL,
 Residenza_Provincia VARCHAR(12) NOT NULL,
 recapito_telefonico VARCHAR(12) NOT NULL,
 PRIMARY KEY(id));


CREATE TABLE drone_details (
    preferiti VARCHAR(10) NOT NULL, 
    titolo VARCHAR(25)  NOT NULL ,
    immagine VARCHAR(25) NOT NULL ,
    descrizione VARCHAR(300) NOT NULL ,
    PRIMARY KEY(titolo));

INSERT INTO drone_details VALUES('pref.png','DJI INSPIRE 2','Imspire2.jpg','Velocità : 30km/h , Distanza Raggiungibile : 60km , max Peso pacco : 4kg , prezzo affitto : 10 euro');
INSERT INTO drone_details VALUES('pref.png','DJI PHANTOM 4','phantom4.jpg','Velocità : 40km/h , Distanza Raggiungibile : 80km , max Peso pacco : 5kg , prezzo affitto : 20 euro');
INSERT INTO drone_details VALUES('pref.png','DJI MAVIC PRO 2','mavicpro2.jpg','Velocità : 25km/h , Distanza Raggiungibile : 20km , max Peso pacco : 2kg , prezzo affitto : 5 euro');
INSERT INTO drone_details VALUES('pref.png','FreeX mcfx','freex.jpg','Velocità : 50km/h , Distanza Raggiungibile : 100km , max Peso pacco : 7kg , prezzo affitto : 30 euro');
INSERT INTO drone_details VALUES('pref.png','U PAIR 2','upair.jpg','Velocità : 15km/h , Distanza Raggiungibile : 10km , max Peso pacco : 2kg , prezzo affitto : 2.5 euro');
INSERT INTO drone_details VALUES('pref.png','Parrot Anafi','ParrotAnafiAmazon.jpg','Velocità : 60km/h , Distanza Raggiungibile : 200km , max Peso pacco : 10kg , prezzo affitto : 45 euro');

CREATE TABLE presentazione (
    immagine VARCHAR(22) NOT NULL,
     titolo VARCHAR(30) NOT NULL,
     paragrafo VARCHAR(200) NOT NULL,
     link VARCHAR(30) NOT NULL,
     href VARCHAR (25),
     PRIMARY KEY (titolo));

INSERT INTO presentazione VALUES('presentazione1.jpeg','Spedisci un pacco','Utilizza subito i nostri droni e spedisci pacchi con un solo click!  -Clicca "dettagli" per effettuare una spedizione.','dettagli','effettuaSpedizioni.php');
INSERT INTO presentazione VALUES('presentazione2.jpeg','Controlla le tue spedizioni','Spedisci in tutta la Sicilia! Controlla subito lo stato delle tue spedizioni! -Clicca "dettagli" per controllare le tue spedizioni.','dettagli','visualizzaSpedizioni.php');


 CREATE TABLE spedizioni (
 id_mittente INTEGER(11) NOT NULL,
 codice_spedizione INTEGER(11) NOT NULL AUTO_INCREMENT,
 nome_dest VARCHAR(15) NOT NULL,
 cognome_dest VARCHAR(15) NOT NULL,
 Città_dest VARCHAR(18) NOT NULL,
 Drone_Spedizione VARCHAR(20) NOT NULL,
 data_spedizione varchar(30) NOT NULL,
 PRIMARY KEY(codice_spedizione));

 CREATE TABLE likes (ID_utente integer NOT NULL , ID_drone integer NOT NULL , like_drone VARCHAR(2) NOT NULL);

 CREATE TABLE likes_totali (ID_drone INTEGER NOT NULL, likes INTEGER, PRIMARY KEY(ID_drone));
 INSERT INTO likes_totali VALUES(0,0);
 INSERT INTO likes_totali VALUES(1,0);
 INSERT INTO likes_totali VALUES(2,0);
 INSERT INTO likes_totali VALUES(3,0);
 INSERT INTO likes_totali VALUES(4,0);
 INSERT INTO likes_totali VALUES(5,0);



CREATE TABLE dislikes (ID_utente integer NOT NULL , ID_drone integer NOT NULL , dislike_drone VARCHAR(2) NOT NULL);

 CREATE TABLE dislikes_totali (ID_drone INTEGER NOT NULL, dislikes INTEGER, PRIMARY KEY(ID_drone));
 INSERT INTO dislikes_totali VALUES(0,0);
 INSERT INTO dislikes_totali VALUES(1,0);
 INSERT INTO dislikes_totali VALUES(2,0);
 INSERT INTO dislikes_totali VALUES(3,0);
 INSERT INTO dislikes_totali VALUES(4,0);
 INSERT INTO dislikes_totali VALUES(5,0);

 CREATE TABLE preferiti (
 id INTEGER(11) NOT NULL,
 id_box INTEGER(11) NOT NULL,
 img varchar(40) NOT NULL ,
 title VARCHAR(30) NOT NULL);


 
 
Delimiter //
Create Trigger LikesTotali
After insert on likes
For each row begin
If new.ID_utente is NOT NULL then
Update likes_totali set likes = likes +1 where 
ID_drone= New.ID_drone;
End if;
End //
delimiter ;


 
Delimiter //
Create Trigger LikesTotali_removed
After delete on likes
For each row begin
If old.ID_utente is NOT NULL then
Update likes_totali set likes = likes -1 where 
ID_drone= old.ID_drone;
End if;
End //
delimiter ;

 
Delimiter //
Create trigger Stop_Like
before insert on likes
For each row begin
Declare msg_error varchar(255);
If(exists(select * from likes where 
ID_drone = new.ID_drone AND ID_utente = new.ID_utente)) then
Set msg_error = ‘ Questo utente h già messo un like al drone’;
Signal sqlstate ‘45000’ set message_text = msg_error;
End if;
End// 
delimiter ;


 
Delimiter //
Create Trigger DislikesTotali
After insert on dislikes
For each row begin
If new.ID_utente is NOT NULL then
Update dislikes_totali set dislikes = dislikes +1 where 
ID_drone= New.ID_drone;
End if;
End //
delimiter ;

 
Delimiter //
Create Trigger DislikesTotali_removed
After delete on dislikes
For each row begin
If old.ID_utente is NOT NULL then
Update dislikes_totali set dislikes = dislikes -1 where 
ID_drone= old.ID_drone;
End if;
End //
delimiter ;

 
Delimiter //
Create trigger Stop_dislike
before insert on dislikes
For each row begin
Declare msg_error varchar(255);
If(exists(select * from dislikes where 
ID_drone = new.ID_drone AND ID_utente = new.ID_utente)) then
Set msg_error = ‘ Questo utente ha già messo un dislike al drone’;
Signal sqlstate ‘45000’ set message_text = msg_error;
End if;
End// 
delimiter ;


Delimiter //
Create trigger RV1 before insert on dislikes
For each row begin
Declare msg_error varchar(255);
If(exists(select ID_utente,ID_drone from likes  where 
ID_utente = new.ID_utente AND ID_drone = new.ID_drone)) then
Set msg_error = ‘ Questo utente ha già inserito like al post.’;
Signal sqlstate ‘45000’ set message_text = msg_error;
End if;
End// 
delimiter ;

Delimiter //
Create trigger RV2 before insert on likes
For each row begin
Declare msg_error varchar(255);
If(exists(select ID_utente,ID_drone from dislikes  where 
ID_utente = new.ID_utente AND ID_drone = new.ID_drone)) then
Set msg_error = ‘ Questo utente ha già inserito dislike al post.’;
Signal sqlstate ‘45000’ set message_text = msg_error;
End if;
End// 
delimiter ;

 
Delimiter //
Create trigger Stop_pref
before insert on preferiti
For each row begin
Declare msg_error varchar(255);
If(exists(select * from preferiti where 
id = new.id AND id_box = new.id_box)) then
Set msg_error = ‘ Questo utente ha già messo nei preferiti questo drone’;
Signal sqlstate ‘45000’ set message_text = msg_error;
End if;
End// 
delimiter ;

 