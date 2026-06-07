import { useEffect, useMemo, useState } from 'react'
import './App.css'

const API_URL = '/vehicles'

const emptyForm = {
  vehicleType: 'Car',
  manufacturer: '',
  model: '',
  releaseYear: '',
  price: '',
  milleage: '',
}

function App() {
  const [vehicles, setVehicles] = useState([])
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const sortedVehicles = useMemo(() => {
    return [...vehicles].sort((a, b) =>
      `${a.vehicleType || ''} ${a.manufacturer || ''}`.localeCompare(
        `${b.vehicleType || ''} ${b.manufacturer || ''}`,
      ),
    )
  }, [vehicles])

  useEffect(() => {
    fetchVehicles()
  }, [])

  // Load all vehicle records
  async function fetchVehicles() {
    try {
      setIsLoading(true)
      setError('')

      const response = await fetch(API_URL)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Could not load vehicles.')
      }

      setVehicles(result.data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Update the form state whenever a user types or changes the dropdown.
  function handleInputChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  // Create a new vehicle or update the selected ome
  async function handleSubmit(event) {
    event.preventDefault()

    const vehicle = {
      vehicleType: formData.vehicleType,
      manufacturer: formData.manufacturer.trim(),
      model: formData.model.trim(),
      releaseYear: Number(formData.releaseYear),
      price: Number(formData.price),
      milleage: Number(formData.milleage),
    }

    if (
      !vehicle.vehicleType ||
      !vehicle.manufacturer ||
      !vehicle.model ||
      !vehicle.releaseYear ||
      !vehicle.price ||
      !vehicle.milleage
    ) {
      setError('Please fill in all vehicle fields.')
      return
    }

    try {
      setIsSaving(true)
      setError('')

      const url = editingId ? `${API_URL}/${editingId}` : API_URL
      const method = editingId ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicle),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Could not save vehicle.')
      }

      await fetchVehicles()
      resetForm()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  // Fill the form with the selected vehicle so it can be edited
  function startEditing(vehicle) {
    setEditingId(vehicle._id)
    setFormData({
      vehicleType: vehicle.vehicleType || 'Car',
      manufacturer: vehicle.manufacturer || '',
      model: vehicle.model || '',
      releaseYear: vehicle.releaseYear ? String(vehicle.releaseYear) : '',
      price: vehicle.price ? String(vehicle.price) : '',
      milleage: vehicle.milleage ? String(vehicle.milleage) : '',
    })
    setError('')
  }

  // Delete a vehicle
  async function deleteVehicle(id) {
    const confirmed = window.confirm('Delete this vehicle record?')

    if (!confirmed) {
      return
    }

    try {
      setError('')

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Could not delete vehicle.')
      }

      setVehicles((current) => current.filter((vehicle) => vehicle._id !== id))

      if (editingId === id) {
        resetForm()
      }
    } catch (err) {
      setError(err.message)
    }
  }

  // Return the form to the add new vehicle state

  function resetForm() {
    setEditingId(null)
    setFormData(emptyForm)
  }

  return (
    <main className="app-shell">
      <section className="page-header">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1>Vehicle Inventory Management</h1>
          <p className="intro">
            Create, view, update, and delete vehicle records from your inventory!.
          </p>
        </div>
        <button className="secondary-button" type="button" onClick={fetchVehicles}>
          Refresh
        </button>
      </section>


      {error && <div className="alert">{error}</div>}

      <section className="inventory-layout">
        <form className="vehicle-form" onSubmit={handleSubmit}>
          <h2>{editingId ? 'Update Vehicle' : 'Add Vehicle'}</h2>

          <label>
            Vehicle Type
            <select
              name="vehicleType"
              onChange={handleInputChange}
              value={formData.vehicleType}
            >
              <option value="Car">Car</option>
              <option value="Motorbike">Motorbike</option>
              <option value="Van">Van</option>
            </select>
          </label>

          <label>
            Manufacturer
            <input
              name="manufacturer"
              onChange={handleInputChange}
              placeholder="Toyota"
              type="text"
              value={formData.manufacturer}
            />
          </label>

          <label>
            Model
            <input
              name="model"
              onChange={handleInputChange}
              placeholder="Corolla"
              type="text"
              value={formData.model}
            />
          </label>

          <label>
            Release Year
            <input
              min="1900"
              name="releaseYear"
              onChange={handleInputChange}
              placeholder="2024"
              type="number"
              value={formData.releaseYear}
            />
          </label>

          <label>
            Price
            <input
              min="0"
              name="price"
              onChange={handleInputChange}
              placeholder="15995"
              type="number"
              value={formData.price}
            />
          </label>

          <label>
            Mileage
            <input
              min="0"
              name="milleage"
              onChange={handleInputChange}
              placeholder="42000"
              type="number"
              value={formData.milleage}
            />
          </label>

          <div className="form-actions">
            <button className="primary-button" disabled={isSaving} type="submit">
              {isSaving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Vehicle'}
            </button>
            {editingId && (
              <button className="secondary-button" type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <section className="vehicle-list">
          <div className="list-header">
            <div>
              <h2>Current Inventory</h2>
              <p>{vehicles.length} vehicle records</p>
            </div>
          </div>

          {isLoading ? (
            <p className="status-text">Loading vehicles...</p>
          ) : sortedVehicles.length === 0 ? (
            <p className="status-text">No vehicles have been added yet.</p>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Manufacturer</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Mileage</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedVehicles.map((vehicle) => (
                    <tr key={vehicle._id}>
                      <td>{vehicle.vehicleType || 'Unknown'}</td>
                      <td>{vehicle.manufacturer || 'Unknown'}</td>
                      <td>{vehicle.model || 'Unknown'}</td>
                      <td>{vehicle.releaseYear || 'Unknown'}</td>
                      <td>{formatMoney(vehicle.price)}</td>
                      <td>{formatNumber(vehicle.milleage)}</td>
                      <td className="row-actions">
                        <button
                          className="small-button"
                          type="button"
                          onClick={() => startEditing(vehicle)}
                        >
                          Edit
                        </button>
                        <button
                          className="danger-button"
                          type="button"
                          onClick={() => deleteVehicle(vehicle._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  )
}

// Format price to display  in  pounds
function formatMoney(value) {
  if (value === undefined || value === null || value === '') {
    return 'Unknown'
  }

  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value)
}

// Format milleage
function formatNumber(value) {
  if (value === undefined || value === null || value === '') {
    return 'Unknown'
  }

  return new Intl.NumberFormat('en-GB').format(value)
}

export default App
