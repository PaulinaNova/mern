import mongoose from "mongoose";

const ciudadanoSchema = mongoose.Schema(
  {
    curp: {
      type: String,
      unique: true,
    },
    nombre: {
      type: String,
    },
    apellidoPaterno: {
      type: String,
    },
    apellidoMaterno: {
      type: String,
    },
    fechaNacimiento: {
      type: String,
    },
    telefono: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    codigoPostal: {
      type: Number,
    },
    municipio: {
      type: String,
    },
    localidad: {
      type: String,
    },
    colonia: {
      type: String,
    },
    calle: {
      type: String,
    },
    caracteristica: {
      type: String,
    },
  },
  {
    timestamps: false,
  }
);

const Ciudadano = mongoose.model("Ciudadano", ciudadanoSchema);

export default Ciudadano;
