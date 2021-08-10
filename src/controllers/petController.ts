import Pet from '../models/petModel'

export default class PetController {
  public async get(req, res) {
    try {
      const pets = await Pet.find({})
      res.json(pets)
    } catch (error) {
      res.json({ error: 'No se pudieron obtener' })
    }
  }

  public async getById(req, res) {
    const { id } = req.params
    const petFound = await Pet.findById(id)

    if (petFound) {
      res.json(petFound)
    } else {
      res.status(404).send('No existe la mascota')
    }
  }

  public async post(req, res) {
    const { raza, nombre } = req.body
    try {
      if (!raza || !nombre) {
        throw { status: 400, message: 'Faltan datos' }
      }

      let petExpect = {}

      let expectedParams = ['nombre', 'raza', 'edad', 'color', 'descripcion']

      Object.keys(req.body).forEach((p) => {
        if (expectedParams.includes(p)) {
          petExpect[p] = req.body[p]
        }
      })

      const pet = new Pet(petExpect)

      await pet.save()

      res.json(pet)
    } catch (error) {
      res.status(error.status).json({ error: error.message })
    }
  }

  public async patch(req, res) {
    const { id } = req.params
    try {
      let petExpect = {}

      let expectedParams = ['nombre', 'raza', 'edad', 'color', 'descripcion']

      Object.keys(req.body).forEach((p) => {
        if (expectedParams.includes(p)) {
          petExpect[p] = req.body[p]
        }
      })

      await Pet.update({ _id: id }, petExpect)

      res
        .status(200)
        .json({ success: 'La mascota se actualizo correctamente. ' })
    } catch (error) {
      res
        .status(404)
        .send({ error: 'la mascota que desea actualizar no existe' })
    }
  }

  public async delete(req, res) {
    const { id } = req.params
    try {
      let remove = await Pet.deleteOne({ _id: id })
      res.status(200).json({ success: 'La mascota se elimino correctamente. ' })
    } catch (error) {
      res
        .status(404)
        .json({ error: 'la mascota que desea actualizar no existe' })
    }
  }
}
