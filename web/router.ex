defmodule Danton.Router do
  use Danton.Web, :router
  use Coherence.Router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Coherence.Authentication.Session
  end

  pipeline :protected do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Coherence.Authentication.Session, protected: true
  end

  # Added by Coherence
  scope "/" do
    pipe_through :browser
    coherence_routes()
  end

  # Added by Coherence
  scope "/" do
    pipe_through :protected
    coherence_routes :protected
  end

  use ExAdmin.Router
  # your app's routes
  scope "/admin", ExAdmin do
    pipe_through :browser
    admin_routes
  end

  # PRIVATE ROUTES
  scope "/", Danton do
    pipe_through :browser
    get "/", PageController, :index
  end

  # PROTECTED ROUTES
  scope "/", Danton do
    pipe_through :protected
    get "/front", PostController, :front_page

    # Add public routes below
    resources "/memberships", MembershipController

    resources "/clubs", ClubController do
      resources "/channels", ChannelController, only: [:index, :new, :create]
    end

    resources "/channels", ChannelController do
      resources "/posts", PostController, only: [:index, :new, :create]
    end

    resources "/posts", PostController
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # Other scopes may use custom stacks.
  scope "/api", Danton do
    pipe_through :api

    # TODO: recomment this once the mobile app handles users
    # pipe_through :protected

    scope "/v1" do
      get "/front", Api.V1.PostController, :front_page
      resources "/memberships", Api.V1.MembershipController

      resources "/clubs", Api.V1.ClubController do
        resources "/channels", Api.V1.ChannelController, only: [:index, :new, :create]
      end

      resources "/channels", Api.V1.ChannelController do
        resources "/posts", Api.V1.PostController, only: [:index, :new, :create]
      end

      resources "/posts", Api.V1.PostController
    end
  end
end
