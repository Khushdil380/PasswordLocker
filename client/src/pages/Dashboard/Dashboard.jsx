import { useState, useEffect, useCallback, useMemo } from 'react'
import { API_BASE_URL } from '../../constants'
import DashboardHeader from '../../components/DashboardHeader'
import CategoryTabs from '../../components/CategoryTabs/CategoryTabs'
import PasswordList from '../../components/PasswordList/PasswordList'
import ViewPassword from '../../components/ViewPassword/ViewPassword'
import Modal from '../../components/Modal/Modal'
import AddPasswordForm from '../../components/AddPasswordForm/AddPasswordForm'
import './Dashboard.css'

function Dashboard() {
  const [categories, setCategories] = useState([])
  const [passwords, setPasswords] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewEntryId, setViewEntryId] = useState(null)
  const [editEntry, setEditEntry] = useState(null)
  const [loadingPasswords, setLoadingPasswords] = useState(false)

  useEffect(() => {
    fetchCategories()
    fetchPasswords()
  }, [])

  useEffect(() => {
    setPasswords([])
    fetchPasswords()
  }, [activeCategory])

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`, { credentials: 'include' })
      const data = await res.json()
      if (res.ok) setCategories(data.categories)
    } catch { /* silent */ }
  }, [])

  const fetchPasswords = async () => {
    setLoadingPasswords(true)
    try {
      const url = activeCategory === 'all'
        ? `${API_BASE_URL}/passwords`
        : `${API_BASE_URL}/passwords?category=${activeCategory}`
      const res = await fetch(url, { credentials: 'include' })
      const data = await res.json()
      if (res.ok) setPasswords(data.passwords)
    } catch { /* silent */ } finally {
      setLoadingPasswords(false)
    }
  }

  const filteredPasswords = useMemo(() => {
    if (!searchQuery.trim()) return passwords
    const query = searchQuery.toLowerCase()
    return passwords.filter((pwd) =>
      pwd.title.toLowerCase().includes(query) ||
      pwd.description?.toLowerCase().includes(query)
    )
  }, [passwords, searchQuery])

  const handlePasswordAdded = (entry) => {
    setPasswords((prev) => [entry, ...prev])
    fetchCategories()
  }

  const handlePasswordUpdated = (updated) => {
    setPasswords((prev) => prev.map((p) => p._id === updated._id ? updated : p))
    setEditEntry(null)
  }

  return (
    <div className="dashboard">
      <DashboardHeader
        onPasswordAdded={handlePasswordAdded}
        onCategoryCreated={fetchCategories}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <div className="dashboard__content">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        <PasswordList
          passwords={filteredPasswords}
          loading={loadingPasswords}
          onView={(id) => setViewEntryId(id)}
          onEdit={(entry) => setEditEntry(entry)}
        />
      </div>

      <ViewPassword
        isOpen={!!viewEntryId}
        onClose={() => setViewEntryId(null)}
        entryId={viewEntryId}
      />

      <Modal isOpen={!!editEntry} onClose={() => setEditEntry(null)}>
        {editEntry && (
          <AddPasswordForm
            editData={editEntry}
            onSuccess={handlePasswordUpdated}
          />
        )}
      </Modal>
    </div>
  )
}

export default Dashboard
