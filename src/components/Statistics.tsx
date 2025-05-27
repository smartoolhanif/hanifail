import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { FireFireApiResponse } from '../types/firefire';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function Statistics() {
  const [uid, setUid] = useState('');
  const [region, setRegion] = useState('');
  const [playerData, setPlayerData] = useState<FireFireApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlayerStats = async () => {
    if (!uid || !region) {
      setError('Please enter both UID and region');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://hanif-full-info.vercel.app/player-info?uid=${uid}&region=${region}`);
      if (!response.ok) {
        throw new Error('Failed to fetch player statistics');
      }
      const data: FireFireApiResponse = await response.json();
      setPlayerData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const rankData = playerData ? [
    { name: 'BR Rank Points', value: playerData.AccountInfo.BrRankPoint },
    { name: 'CS Rank Points', value: playerData.AccountInfo.CsRankPoint },
    { name: 'BR Max Rank', value: playerData.AccountInfo.BrMaxRank },
    { name: 'CS Max Rank', value: playerData.AccountInfo.CsMaxRank },
  ] : [];

  const guildData = playerData ? [
    { name: 'Members', value: playerData.GuildInfo.GuildMember },
    { name: 'Available Slots', value: playerData.GuildInfo.GuildCapacity - playerData.GuildInfo.GuildMember },
  ] : [];

  return (
    <div className="container">
      <h1>Player Statistics</h1>
      
      <div className="input-group">
        <input
          type="text"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          placeholder="Enter UID"
        />
        <input
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="Enter region (e.g., ind)"
        />
        <button onClick={fetchPlayerStats} disabled={loading}>
          {loading ? 'Loading...' : 'Get Statistics'}
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {playerData && (
        <div className="statistics-container">
          <div className="section">
            <h2>Rank Statistics</h2>
            <div style={{ height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rankData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#646cff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="section">
            <h2>Guild Composition</h2>
            <div style={{ height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={guildData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {guildData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="section">
            <h2>Player Summary</h2>
            <div className="info-grid">
              <div>
                <strong>Account Level</strong>
                {playerData.AccountInfo.AccountLevel}
              </div>
              <div>
                <strong>Experience</strong>
                {playerData.AccountInfo.AccountEXP.toLocaleString()}
              </div>
              <div>
                <strong>Likes</strong>
                {playerData.AccountInfo.AccountLikes.toLocaleString()}
              </div>
              <div>
                <strong>Guild Level</strong>
                {playerData.GuildInfo.GuildLevel}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
