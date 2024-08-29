document.addEventListener('DOMContentLoaded', async () => {
    const clientIds = ['497843222245146651', '530148034038988811']; // IDs dos usuários do Discord
    const accessToken = 'MTI1NTY5MjA4NDgyODk2Mjg4Ng.GC8dDK.k6vRHdEZPTsXjGt7qdXnbmU84dzvcpL8F8'; // Seu token de acesso OAuth2

    const fetchAvatar = async (clientId) => {
        try {
            const response = await fetch(`https://discord.com/api/v10/users/${clientId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar avatar');
            }

            const data = await response.json();
            return data.avatar;
        } catch (error) {
            console.error(`Erro ao obter avatar para o usuário ${clientId}:`, error);
            return null;
        }
    };

    clientIds.forEach(async (clientId, index) => {
        const avatarId = await fetchAvatar(clientId);
        if (avatarId) {
            const avatarUrl = `https://cdn.discordapp.com/avatars/${clientId}/${avatarId}.png`;
            const discordAvatar = document.getElementById(`discordAvatar-${index + 1}`);
            if (discordAvatar) {
                discordAvatar.src = avatarUrl;
            }
        }
    });
});
