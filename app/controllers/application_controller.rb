class ApplicationController < ActionController::API
  before_action :authenticate_user

  include ActionController::Cookies

  # def hello_world
  #   session[:count] = (session[:count] || 0) + 1
  #   render json: { count: session[:count] }
  # end

  def current_user
    #memoization
    #use the value of current user and find by to raise nil as a response instead of an exception
    @current_user ||= session[:user_id] && User.find_by_id(session[:user_id])
  end


  private

  def authenticate_user # checking to see if a user is logged in
    render json: { errors: {User: "Not Authorized"} }, status: :unauthorized unless current_user
  end

  def is_authorized?
    permitted = current_user
    render json: { errors: {User: "does not have admin permissions"} }, status: :forbidden unless permitted
  end

end
