<script>
  let username = '';
  let password = '';
  let message = '';

  async function handleLogin() {
    try {
      const response = await fetch('/api/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      //if (!response.ok) {
        //throw new Error(`Erreur HTTP ${response.status}`);		
      //}

      const data = await response.json();

      if (data.success) {
        message = 'Connexion réussie !';
      } else {
        message = 'Erreur de connexion. Veuillez réessayer.';
      }
    } catch (error) {
      message = `Erreur lors de la connexion au serveur: ${error.message}`;
      console.error('Erreur:', error);
    }
  }
</script>

<main>
  <h1>Page de connexion</h1>

  <form on:submit|preventDefault={handleLogin}>
    <label for="username">Nom d'utilisateur :</label>
    <input id="username" type="text" bind:value={username} required />

    <label for="password">Mot de passe :</label>
    <input id="password" type="password" bind:value={password} required />

    <button type="submit">Se connecter</button>
  </form>

  {#if message}
    <p>{message}</p>
  {/if}
</main>

<style>
  form {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: auto;
  }
  label, input {
    margin-bottom: 10px;
  }
  button {
    margin-top: 10px;
  }
</style>

