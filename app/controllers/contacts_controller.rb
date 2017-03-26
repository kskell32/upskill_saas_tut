class ContactsController < ApplicationController
    # Get request to /contact-us
    # show new contact form
    def new
        @contact = Contact.new
    end
    
    
    # Post request /contacts
    def create
    # Mass assignment of form fields into Contact object
       @contact = Contact.new(contact_params)
       # save the Contact object to the database
       if @contact.save 
           # Store form fields via parameters. into variables
           name = params[:contact][:name]
           email = params[:contact][:email]
           body = params[:contact][:comments]
           # Plug variables into Contact Mailer email method and send email
           ContactMailer.contact_email(name, email, body).deliver
           # Store success message in flash hash
           # redirect to the new action
           flash[:success] = "Message sent."
            redirect_to new_contact_path
        else
            # If Contact object doesnt save,
            # store errors in a flash hash
            # and redirect to the new action
            flash[:danger] = @contact.errors.full_messages.join(", ")
            redirect_to new_contact_path
       end
    end
    
    private
      # To collect data from form, we need to use
      # strong parameters and whitelist the form fields
        def contact_params
            params.require(:contact).permit(:name, :email, :comments)
        end
end
