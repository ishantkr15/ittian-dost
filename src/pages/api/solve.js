export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { problem } = req.body;

  if (!problem) {
    return res.status(400).json({ error: 'Problem text is required' });
  }

  try {
    // In a real implementation, you would call the DeepSeek API here
    // This is a mock implementation for demonstration
    
    // Example of what the real API call might look like:
    /*
    const response = await fetch('https://api.deepseek.com/v1/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        problem: problem,
        subject: 'physics', // You might detect this from input
        difficulty: 'jee_advanced',
        format: 'step_by_step'
      })
    });
    
    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status}`);
    }
    
    const data = await response.json();
    */
    
    // Mock response for demo purposes
    const mockSolution = `
**Problem:** ${problem}

**Solution:**

1. **Understand the problem**: First, we need to identify what's being asked. The problem appears to be about ${problem.includes('velocity') ? 'kinematics' : problem.includes('resistance') ? 'electric circuits' : 'a general physics concept'}.

2. **Identify known quantities**: Let's list out the given information:
   - ${problem.includes('mass') ? 'Mass (m) is provided' : 'No mass mentioned'}
   - ${problem.includes('velocity') ? 'Initial velocity is given' : 'Velocity not specified'}

3. **Choose appropriate formula**: Based on the problem, we should use:
   \\[ F = ma \\]
   where:
   - \\(F\\) is force
   - \\(m\\) is mass
   - \\(a\\) is acceleration

4. **Solve step-by-step**:
   - Step 1: Calculate acceleration
   - Step 2: Apply Newton's second law
   - Step 3: Verify units

5. **Final Answer**: After calculations, we find that the solution is \\boxed{42} (mock answer for demonstration).
    `;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    res.status(200).json({ solution: mockSolution });
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    res.status(500).json({ error: 'Failed to get solution', details: error.message });
  }
}