import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useCampaignStore } from '../../store/campaignStore'
import { useAuthStore } from '../../store/authStore'
import { 
  Target, 
  DollarSign, 
  Calendar, 
  Users, 
  Tag,
  FileText,
  ArrowLeft
} from 'lucide-react'

const CATEGORIES = [
  'Fashion', 'Beauty', 'Fitness', 'Food', 'Travel', 'Tech', 
  'Gaming', 'Lifestyle', 'Business', 'Education', 'Art', 'Music'
]

const PLATFORMS = ['Instagram', 'YouTube', 'Twitter', 'TikTok']

const CreateCampaign = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { addCampaign } = useCampaignStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      categories: [],
      platforms: [],
      status: 'draft'
    }
  })

  const watchCategories = watch('categories') || []
  const watchPlatforms = watch('platforms') || []

  const toggleCategory = (category) => {
    const current = watchCategories
    const updated = current.includes(category)
      ? current.filter(c => c !== category)
      : [...current, category]
    setValue('categories', updated)
  }

  const togglePlatform = (platform) => {
    const current = watchPlatforms
    const updated = current.includes(platform)
      ? current.filter(p => p !== platform)
      : [...current, platform]
    setValue('platforms', updated)
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const newCampaign = {
        ...data,
        brandId: user.id,
        brandName: user.name,
        createdAt: new Date().toISOString(),
        applicants: 0
      }
      
      addCampaign(newCampaign)
      setIsLoading(false)
      navigate('/campaigns')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
          <p className="text-gray-600">Set up your influencer marketing campaign</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <Target className="h-6 w-6 text-primary-600" />
              <h2 className="text-xl font-semibold">Campaign Details</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Title *
                </label>
                <input
                  {...register('title', { 
                    required: 'Campaign title is required',
                    minLength: {
                      value: 5,
                      message: 'Title must be at least 5 characters'
                    }
                  })}
                  type="text"
                  className="input-field"
                  placeholder="Enter campaign title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  {...register('description', { 
                    required: 'Description is required',
                    minLength: {
                      value: 50,
                      message: 'Description must be at least 50 characters'
                    }
                  })}
                  rows={4}
                  className="input-field resize-none"
                  placeholder="Describe your campaign goals, requirements, and what you're looking for in an influencer..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget ($) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('budget', { 
                        required: 'Budget is required',
                        min: {
                          value: 100,
                          message: 'Budget must be at least $100'
                        }
                      })}
                      type="number"
                      className="input-field pl-10"
                      placeholder="1000"
                      min="100"
                    />
                  </div>
                  {errors.budget && (
                    <p className="mt-1 text-sm text-red-600">{errors.budget.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deadline
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register('deadline')}
                      type="date"
                      className="input-field pl-10"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Target Audience */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="h-6 w-6 text-primary-600" />
              <h2 className="text-xl font-semibold">Target Audience</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Content Categories *
                </label>
                <p className="text-sm text-gray-600 mb-4">Select the categories that match your campaign</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleCategory(category)}
                      className={`p-3 rounded-lg border-2 transition-all text-left ${
                        watchCategories.includes(category)
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-medium">{category}</span>
                    </button>
                  ))}
                </div>
                {watchCategories.length === 0 && (
                  <p className="mt-2 text-sm text-red-600">Please select at least one category</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Preferred Platforms *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {PLATFORMS.map((platform) => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => togglePlatform(platform)}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${
                        watchPlatforms.includes(platform)
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-medium">{platform}</span>
                    </button>
                  ))}
                </div>
                {watchPlatforms.length === 0 && (
                  <p className="mt-2 text-sm text-red-600">Please select at least one platform</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Followers
                  </label>
                  <input
                    {...register('minFollowers')}
                    type="number"
                    className="input-field"
                    placeholder="1000"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Followers
                  </label>
                  <input
                    {...register('maxFollowers')}
                    type="number"
                    className="input-field"
                    placeholder="100000"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="h-6 w-6 text-primary-600" />
              <h2 className="text-xl font-semibold">Campaign Requirements</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deliverables
                </label>
                <textarea
                  {...register('deliverables')}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="e.g., 1 Instagram post, 3 Instagram stories, 1 YouTube video..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Requirements
                </label>
                <textarea
                  {...register('requirements')}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Any specific requirements, guidelines, or restrictions..."
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-secondary"
            >
              Cancel
            </button>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading || watchCategories.length === 0 || watchPlatforms.length === 0}
                onClick={() => setValue('status', 'draft')}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : 'Save as Draft'}
              </button>
              
              <button
                type="submit"
                disabled={isLoading || watchCategories.length === 0 || watchPlatforms.length === 0}
                onClick={() => setValue('status', 'active')}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Publishing...' : 'Publish Campaign'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCampaign