class PagesController < ApplicationController
    #get request for / which is our homepage
    def home
        @basic_plan = Plan.find(1)
        @pro_plan = Plan.find(2) # Is this 
    end
    
    def about
    end
end