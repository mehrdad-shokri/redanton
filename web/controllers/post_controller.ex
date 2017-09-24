defmodule Danton.PostController do
  use Danton.Web, :controller

  plug Guardian.Plug.EnsureAuthenticated, handler: __MODULE__, typ: "access"

  # ===========================
  # ACTIONS
  # ===========================

  def index(conn,  %{"channel_id" => channel_id}, _current_user, _claims) do
    posts = Post.for_channel_ids([channel_id]) |> Repo.all
    render(conn, "index.html", posts: posts, channel_id: channel_id)
  end

  def front_page(conn, _params, current_user, _claims) do
		posts = Post.for_front_page(current_user) |> Repo.all()
    render(conn, "front_page.html", posts: posts)
  end

  def new(conn, %{"channel_id" => channel_id}, _current_user, _claims) do
    changeset = Post.changeset(%Post{})
    render(conn, "new.html", changeset: changeset, channel_id: channel_id)
  end

  def create(conn, %{"post" => post_params, "channel_id" => channel_id}, _current_user, _claims) do
    channel = Repo.get(Danton.Channel, channel_id)

    %Danton.Post{}
      |> Post.changeset(post_params)
      |> Ecto.Changeset.put_assoc(:channel, channel)
      |> Repo.insert()
      |> case do
      {:ok, _post} ->
        conn
        |> put_flash(:info, "Post created successfully.")
        |> redirect(to: channel_post_path(conn, :index, channel_id))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset, channel_id: channel_id)
    end
  end

  def show(conn, %{"id" => id}, _current_user, _claims) do
    post = Repo.get!(Post, id)
    render(conn, "show.html", post: post)
  end

  def edit(conn, %{"id" => id}, _current_user, _claims) do
    post = Repo.get!(Post, id)
    changeset = Post.changeset(post)
    render(conn, "edit.html", post: post, changeset: changeset)
  end

  def update(conn, %{"id" => id, "post" => post_params}, _current_user, _claims) do
    post = Repo.get!(Post, id)
    changeset = Post.changeset(post, post_params)

    case Repo.update(changeset) do
      {:ok, post} ->
        conn
        |> put_flash(:info, "Post updated successfully.")
        |> redirect(to: post_path(conn, :show, post))
      {:error, changeset} ->
        render(conn, "edit.html", post: post, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}, _current_user, _claims) do
    post = Repo.get!(Post, id)
    channel_id = post.channel_id

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(post)

    conn
    |> put_flash(:info, "Post deleted successfully.")
    |> redirect(to: channel_post_path(conn, :index, channel_id))
  end
end
