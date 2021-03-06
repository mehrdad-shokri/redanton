defmodule Danton.View.Helpers do
  def active_on_current(%{request_path: path}, path), do: "active"
  def active_on_current(_, _), do: ""

  def admin_logged_in?(conn), do: Danton.Guardian.Plug.authenticated?(conn, :admin)
  def admin_user(conn), do: Danton.Guardian.Plug.current_resource(conn, :admin)

  def logged_in?(conn), do: Danton.Guardian.Plug.authenticated?(conn)
  def current_user(conn), do: Danton.Guardian.Plug.current_resource(conn)

  def relative_time(time) do
    Timex.from_now time
  end
end
