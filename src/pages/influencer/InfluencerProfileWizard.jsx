import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '../../store/authStore'
import { 
  User, 
  Instagram, 
  Youtube, 
  Twitter, 
  Users, 
  Tag,
  ChevronRight,
  ChevronLeft,
  Check
} from 'lucide-react'

const CATEGORIES = [
  'Fashion', 'Beauty', 'Fitness', 'Food', 'Travel', 'Tech', 
  'Gaming', 'Lifestyle', 'Business', 'Education', 'Art', 'Music'
]

const PLATFORMS = [
  { name: 'Instagram', icon: Instagram, key: 'instagram' },
  { name: 'YouTube', icon: Youtube, key: 'youtube' },
  { name: 'Twitter', icon: Twitter, key: 'twitter' },
  { name: 'TikTok', icon: User, key: 'tiktok' }
]

const InfluencerProfileWizard = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { user, updateUser } = useAuthStore()
  const navigate = useNavigate()
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      categories: [],
      platforms: {}
    }
  })

  const watchCategories = watch('categories') || []
  const watchPlatforms = watch('platforms') || {}

  const toggleCategory = (category) => {
    const current = watchCategories
    const updated = current.includes(category)
      ? current.filter(c => c !== category)
      : [...current, category]
    setValue('categories', updated)
  }

  const onSubmit = async (data) => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const profileData = {
        bio: data.bio,
        categories: data.categories,
        platforms: data.platforms,
        profileCompleted: true
      }
      
      updateUser(profileData)
      setIsLoading(false)
      navigate('/dashboard')
    }, 1000)
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
            <span className="text-sm text-gray-500">Step {currentStep} of 3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 1: Bio */}
          {currentStep === 1 && (
            <div className="card">
              <div className="flex items-center space-x-3 mb-6">
                <User className="h-6 w-6 text-primary-600" />
                <h2 className="text-xl font-semibold">Tell us about yourself</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    {...register('bio', { 
                      required: 'Bio is required',
                      minLength: {
                        value: 50,
                        message: 'Bio must be at least 50 characters'
                      }
                    })}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Tell brands about yourself, your content style, and what makes you unique..."
                  />
                  {errors.bio && (
                    <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Categories */}
          {currentStep === 2 && (
            <div className="card">
              <div className="flex items-center space-x-3 mb-6">
                <Tag className="h-6 w-6 text-primary-600" />
                <h2 className="text-xl font-semibold">Select your content categories</h2>
              </div>
              
              <p className="text-gray-600 mb-6">Choose the categories that best describe your content (select at least 2)</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => toggleCategory(category)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      watchCategories.includes(category)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category}</span>
                      {watchCategories.includes(category) && (
                        <Check className="h-4 w-4" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              {watchCategories.length < 2 && (
                <p className="mt-4 text-sm text-red-600">Please select at least 2 categories</p>
              )}
            </div>
          )}

          {/* Step 3: Social Platforms */}
          {currentStep === 3 && (
            <div className="card">
              <div className="flex items-center space-x-3 mb-6">
                <Users className="h-6 w-6 text-primary-600" />
                <h2 className="text-xl font-semibold">Add your social platforms</h2>
              </div>
              
              <p className="text-gray-600 mb-6">Add your social media handles and follower counts</p>
              
              <div className="space-y-6">
                {PLATFORMS.map((platform) => {
                  const Icon = platform.icon
                  return (
                    <div key={platform.key} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <Icon className="h-5 w-5 text-gray-600" />
                        <h3 className="font-medium">{platform.name}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username/Handle
                          </label>
                          <input
                            {...register(`platforms.${platform.key}.username`)}
                            type="text"
                            className="input-field"
                            placeholder={`@your${platform.key}handle`}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Followers
                          </label>
                          <input
                            {...register(`platforms.${platform.key}.followers`)}
                            type="number"
                            className="input-field"
                            placeholder="0"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !watch('bio')) ||
                  (currentStep === 2 && watchCategories.length < 2)
                }
                className="flex items-center space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Completing Profile...' : 'Complete Profile'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default InfluencerProfileWizard