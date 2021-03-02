const [text, setText] = useState('my text');

<Textarea
placeholder="Some placeholder"
valid={true}
label={'My label'}
maxlength={12}
value={text}
onChange={setText}
/>
<Textarea
placeholder="Some placeholder"
valid={false}
value={text}
onChange={setText}
rows={5}
label={<MyLabel />}
/>
