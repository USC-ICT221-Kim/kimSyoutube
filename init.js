import app from "./app";

const PORT = 4000;

const handlelistening = () => console.log(`Listening on: http://localhost:4000`);

app.listen(PORT, handlelistening);