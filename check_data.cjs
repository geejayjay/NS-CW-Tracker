// Quick script to check data via the local proxy
const http = require('http');

const url = 'http://localhost:5175/ninja-api/data/clan_rankings.json?t=' + Date.now();

http.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    
    console.log('=== LIVE DATA CHECK ===');
    console.log('Generated at:', json.generated_at);
    console.log('Season:', json.season.name);
    console.log('Total clans:', json.clans.length);
    
    // Find our clan (715)
    const myClan = json.clans.find(c => c.id === 715);
    console.log('\n=== MY CLAN (ID 715) ===');
    if (myClan) {
      console.log('Rank: #' + myClan.rank + ', Name: ' + myClan.name + ', Rep: ' + myClan.reputation);
    } else {
      console.log('NOT FOUND in top 100!');
    }
    
    // Find Latam Unida (102)
    const latam = json.clans.find(c => c.id === 102);
    console.log('\n=== LATAM UNIDA (ID 102) ===');
    if (latam) {
      console.log('Rank: #' + latam.rank + ', Name: ' + latam.name + ', Rep: ' + latam.reputation + ', Members: ' + latam.members);
      console.log('Deduction: ' + latam.deduction);
      const inactiveCount = latam.member_list.filter(m => m.reputation === 0 || (m.level >= 80 && m.reputation < 200)).length;
      console.log('Inactive members: ' + inactiveCount + ' (' + ((inactiveCount/latam.members)*100).toFixed(1) + '%)');
    }
    
    // Show clans near Latam Unida rank (ranks 1-9)
    console.log('\n=== TOP 10 CLANS ===');
    json.clans.filter(c => c.rank <= 10).forEach(c => {
      console.log('  #' + c.rank + ' - ' + c.name + ' (ID: ' + c.id + ') - Rep: ' + c.reputation);
    });
    
    // Bleed yield analysis
    if (myClan && latam) {
      const diffPercent = ((latam.reputation - myClan.reputation) / myClan.reputation * 100);
      console.log('\n=== BLEED YIELD FOR LATAM UNIDA ===');
      console.log('My clan rep: ' + myClan.reputation);
      console.log('Latam Unida rep: ' + latam.reputation);
      console.log('Diff: ' + diffPercent.toFixed(2) + '%');
      
      let yv = 1;
      if (diffPercent > 25) yv = 15;
      else if (diffPercent > 10) yv = 10;
      else if (diffPercent >= 0) yv = 6;
      else if (diffPercent >= -10) yv = 3;
      console.log('Bleed yield: +' + yv);
    }
    
    console.log('\n=== KEY ISSUE: WHY BLEED DETECTION MAY NOT WORK ===');
    console.log('1. The app needs >= 2 CONSECUTIVE ticks of rep gain to flag "continuously gaining"');
    console.log('2. On first load, only 2 snapshots exist (simulated + live) -> max streak = 1');
    console.log('3. Bleed targets only shown when a NEARBY clan (within +/-5 ranks) is continuously gaining');
    console.log('4. The app currently has Simulation Mode ON by default, not fetching real data');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
