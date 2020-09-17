Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  root 'home#index'

  get 'thankyou', to: 'home#thankyou'

  get '/what-is-coding', to: 'learn_coding#what_is_coding'
  get '/why-start-early', to: 'learn_coding#start_early'
  get '/get-started', to: 'learn_coding#get_started'

  get '/about-us', to: 'about_us#index'
  get '/featuresandadvantages', to: 'about_us#features_and_advantages'
  get '/faq', to: 'about_us#faq'


  get '/course-all', to: 'courses#show_all'
  get '/block-programming', to: 'courses#block_programming'
  get '/python-programming', to: 'courses#python_programming'
  get '/webdev-jr', to: 'courses#webdev_jr'

  get '/contact-us', to: 'contact_us#index'

  get '/users/profile', to: 'users#show'
  get '/users/add', to: 'users#add' , as: 'add_user'
  get '/users/course-choice', to: 'users#course_choice'
  get '/users/details', to: 'users#details'

  
  
  post '/users/add_course_choice', to: 'users#add_course_choice'


end
